"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linter_1 = require("../linter");
const resource_1 = require("./resource");
exports.importsLinter = new linter_1.Linter(assembly => resource_1.ResourceReflection
    .findAll(assembly)
    .filter(r => r.construct && r.construct.interfaceType) // only resources that have an interface can have "fromXxx" methods
    .map(construct => new ImportsReflection(construct)));
class ImportsReflection {
    constructor(resource) {
        this.resource = resource;
        const sys = resource.sys;
        this.prefix = `from${resource.basename}`;
        const classType = resource.construct.classType;
        this.fromAttributesMethodName = `${this.prefix}Attributes`;
        this.fromAttributesMethod = classType.allMethods.find(x => x.name === this.fromAttributesMethodName);
        this.fromMethods = classType.allMethods.filter(x => x.static
            && x.name.match(`^${this.prefix}[A-Z]`)
            && x.name !== this.fromAttributesMethodName);
        const attributesStructFqn = `${classType.fqn}Attributes`;
        const attributesStruct = sys.tryFindFqn(attributesStructFqn);
        if (attributesStruct) {
            if (!attributesStruct.isInterfaceType() || !attributesStruct.isDataType()) {
                throw new Error(`Attributes type ${attributesStructFqn} must be an interface struct`);
            }
        }
        this.attributesStructName = attributesStructFqn;
        this.attributesStruct = attributesStruct;
    }
}
exports.importsLinter.add({
    code: 'no-static-import',
    message: 'static "import" methods are deprecated in favor of "fromAttributes" (see guidelines)',
    eval: e => {
        const hasImport = e.ctx.resource.construct.classType.allMethods.find(x => x.static && x.name === 'import');
        e.assert(!hasImport, e.ctx.resource.fqn + '.import');
    }
});
exports.importsLinter.add({
    code: 'from-method',
    message: 'resource should have at least one "fromXxx" static method or "fromXxxAttributes"',
    eval: e => {
        // no attributes are defined on the interface, so we don't expect any "from" methods.
        if (!e.ctx.resource.attributes.some(a => a.site === resource_1.AttributeSite.Interface)) {
            return;
        }
        e.assert(e.ctx.fromMethods.length > 0 || e.ctx.fromAttributesMethod, e.ctx.resource.fqn);
    }
});
exports.importsLinter.add({
    code: 'from-signature',
    message: 'invalid method signature for fromXxx method',
    eval: e => {
        for (const method of e.ctx.fromMethods) {
            // "fromRoleArn" => "roleArn"
            const argName = e.ctx.resource.basename[0].toLocaleLowerCase() + method.name.slice('from'.length + 1);
            e.assertSignature(method, {
                parameters: [
                    { name: 'scope', type: e.ctx.resource.construct.ROOT_CLASS },
                    { name: 'id', type: 'string' },
                    { name: argName, type: 'string' }
                ],
                returns: e.ctx.resource.construct.interfaceType
            });
        }
    }
});
exports.importsLinter.add({
    code: 'from-attributes',
    message: 'static fromXxxAttributes is a factory of IXxx from its primitive attributes',
    eval: e => {
        if (!e.ctx.fromAttributesMethod) {
            return;
        }
        e.assertSignature(e.ctx.fromAttributesMethod, {
            parameters: [
                { name: 'scope', type: e.ctx.resource.construct.ROOT_CLASS },
                { name: 'id', type: 'string' },
                { name: 'attrs', type: e.ctx.attributesStruct }
            ]
        });
    }
});
exports.importsLinter.add({
    code: 'from-attributes-struct',
    message: 'resource should have an XxxAttributes struct',
    eval: e => {
        if (!e.ctx.fromAttributesMethod) {
            return; // no "fromAttributes" method
        }
        e.assert(e.ctx.attributesStruct, e.ctx.attributesStructName);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltcG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBbUM7QUFDbkMseUNBQStEO0FBRWxELFFBQUEsYUFBYSxHQUFHLElBQUksZUFBTSxDQUFvQixRQUFRLENBQUMsRUFBRSxDQUFDLDZCQUFrQjtLQUN0RixPQUFPLENBQUMsUUFBUSxDQUFDO0tBQ2pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxtRUFBbUU7S0FDekgsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFdkQsTUFBTSxpQkFBaUI7SUFRckIsWUFBNEIsUUFBNEI7UUFBNUIsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFDdEQsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQy9DLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLFlBQVksQ0FBQztRQUMzRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBRXJHLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDL0MsQ0FBQyxDQUFDLE1BQU07ZUFDTCxDQUFDLENBQUMsSUFBSSxDQUFD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Q0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyByZWZsZWN0IGZyb20gJ2pzaWktcmVmbGVjdCc7XG5pbXBvcnQgeyBMaW50ZXIgfSBmcm9tICcuLi9saW50ZXInO1xuaW1wb3J0IHsgQXR0cmlidXRlU2l0ZSwgUmVzb3VyY2VSZWZsZWN0aW9uIH0gZnJvbSAnLi9yZXNvdXJjZSc7XG5cbmV4cG9ydCBjb25zdCBpbXBvcnRzTGludGVyID0gbmV3IExpbnRlcjxJbXBvcnRzUmVmbGVjdGlvbj4oYXNzZW1ibHkgPT4gUmVzb3VyY2VSZWZsZWN0aW9uXG4gIC5maW5kQWxsKGFzc2VtYmx5KVxuICAuZmlsdGVyKHIgPT4gci5jb25zdHJ1Y3QgJiYgci5jb25zdHJ1Y3QuaW50ZXJmYWNlVHlwZSkgLy8gb25seSByZXNvdXJjZXMgdGhhdCBoYXZlIGFuIGludGVyZmFjZSBjYW4gaGF2ZSBcImZyb21YeHhcIiBtZXRob2RzXG4gIC5tYXAoY29uc3RydWN0ID0+IG5ldyBJbXBvcnRzUmVmbGVjdGlvbihjb25zdHJ1Y3QpKSk7XG5cbmNsYXNzIEltcG9ydHNSZWZsZWN0aW9uIHtcbiAgcHVibGljIHJlYWRvbmx5IGZyb21NZXRob2RzOiByZWZsZWN0Lk1ldGhvZFtdO1xuICBwdWJsaWMgcmVhZG9ubHkgcHJlZml4OiBzdHJpbmc7XG4gIHB1YmxpYyByZWFkb25seSBmcm9tQXR0cmlidXRlc01ldGhvZE5hbWU6IHN0cmluZztcbiAgcHVibGljIHJlYWRvbmx5IGZyb21BdHRyaWJ1dGVzTWV0aG9kPzogcmVmbGVjdC5NZXRob2Q7XG4gIHB1YmxpYyByZWFkb25seSBhdHRyaWJ1dGVzU3RydWN0TmFtZTogc3RyaW5nO1xuICBwdWJsaWMgcmVhZG9ubHkgYXR0cmlidXRlc1N0cnVjdD86IHJlZmxlY3QuSW50ZXJmYWNlVHlwZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcmVzb3VyY2U6IFJlc291cmNlUmVmbGVjdGlvbikge1xuICAgIGNvbnN0IHN5cyA9IHJlc291cmNlLnN5cztcbiAgICB0aGlzLnByZWZpeCA9IGBmcm9tJHtyZXNvdXJjZS5iYXNlbmFtZX1gO1xuICAgIGNvbnN0IGNsYXNzVHlwZSA9IHJlc291cmNlLmNvbnN0cnVjdC5jbGFzc1R5cGU7XG4gICAgdGhpcy5mcm9tQXR0cmlidXRlc01ldGhvZE5hbWUgPSBgJHt0aGlzLnByZWZpeH1BdHRyaWJ1dGVzYDtcbiAgICB0aGlzLmZyb21BdHRyaWJ1dGVzTWV0aG9kID0gY2xhc3NUeXBlLmFsbE1ldGhvZHMuZmluZCh4ID0+IHgubmFtZSA9PT0gdGhpcy5mcm9tQXR0cmlidXRlc01ldGhvZE5hbWUpO1xuXG4gICAgdGhpcy5mcm9tTWV0aG9kcyA9IGNsYXNzVHlwZS5hbGxNZXRob2RzLmZpbHRlcih4ID0+XG4gICAgICAgIHguc3RhdGljXG4gICAgICAgICYmIHgubmFtZS5tYXRjaChgXiR7dGhpcy5wcmVmaXh9W0EtWl1gKVxuICAgICAgICAmJiB4Lm5hbWUgIT09IHRoaXMuZnJvbUF0dHJpYnV0ZXNNZXRob2ROYW1lKTtcblxuICAgIGNvbnN0IGF0dHJpYnV0ZXNTdHJ1Y3RGcW4gPSBgJHtjbGFzc1R5cGUuZnFufUF0dHJpYnV0ZXNgO1xuICAgIGNvbnN0IGF0dHJpYnV0ZXNTdHJ1Y3QgPSBzeXMudHJ5RmluZEZxbihhdHRyaWJ1dGVzU3RydWN0RnFuKTtcbiAgICBpZiAoYXR0cmlidXRlc1N0cnVjdCkge1xuICAgICAgaWYgKCFhdHRyaWJ1dGVzU3RydWN0LmlzSW50ZXJmYWNlVHlwZSgpIHx8ICFhdHRyaWJ1dGVzU3RydWN0LmlzRGF0YVR5cGUoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEF0dHJpYnV0ZXMgdHlwZSAke2F0dHJpYnV0ZXNTdHJ1Y3RGcW59IG11c3QgYmUgYW4gaW50ZXJmYWNlIHN0cnVjdGApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmF0dHJpYnV0ZXNTdHJ1Y3ROYW1lID0gYXR0cmlidXRlc1N0cnVjdEZxbjtcbiAgICB0aGlzLmF0dHJpYnV0ZXNTdHJ1Y3QgPSBhdHRyaWJ1dGVzU3RydWN0O1xuICB9XG59XG5cbmltcG9ydHNMaW50ZXIuYWRkKHtcbiAgY29kZTogJ25vLXN0YXRpYy1pbXBvcnQnLFxuICBtZXNzYWdlOiAnc3RhdGljIFwiaW1wb3J0XCIgbWV0aG9kcyBhcmUgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBcImZyb21BdHRyaWJ1dGVzXCIgKHNlZSBndWlkZWxpbmVzKScsXG4gIGV2YWw6IGUgPT4ge1xuICAgIGNvbnN0IGhhc0ltcG9ydCA9IGUuY3R4LnJlc291cmNlLmNvbnN0cnVjdC5jbGFzc1R5cGUuYWxsTWV0aG9kcy5maW5kKHggPT4geC5zdGF0aWMgJiYgeC5uYW1lID09PSAnaW1wb3J0Jyk7XG4gICAgZS5hc3NlcnQoIWhhc0ltcG9ydCwgZS5jdHgucmVzb3VyY2UuZnFuICsgJy5pbXBvcnQnKTtcbiAgfVxufSk7XG5cbmltcG9ydHNMaW50ZXIuYWRkKHtcbiAgY29kZTogJ2Zyb20tbWV0aG9kJyxcbiAgbWVzc2FnZTogJ3Jlc291cmNlIHNob3VsZCBoYXZlIGF0IGxlYXN0IG9uZSBcImZyb21YeHhcIiBzdGF0aWMgbWV0aG9kIG9yIFwiZnJvbVh4eEF0dHJpYnV0ZXNcIicsXG4gIGV2YWw6IGUgPT4ge1xuICAgIC8vIG5vIGF0dHJpYnV0ZXMgYXJlIGRlZmluZWQgb24gdGhlIGludGVyZmFjZSwgc28gd2UgZG9uJ3QgZXhwZWN0IGFueSBcImZyb21cIiBtZXRob2RzLlxuICAgIGlmICghZS5jdHgucmVzb3VyY2UuYXR0cmlidXRlcy5zb21lKGEgPT4gYS5zaXRlID09PSBBdHRyaWJ1dGVTaXRlLkludGVyZmFjZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlLmFzc2VydChlLmN0eC5mcm9tTWV0aG9kcy5sZW5ndGggPiAwIHx8IGUuY3R4LmZyb21BdHRyaWJ1dGVzTWV0aG9kLCBlLmN0eC5yZXNvdXJjZS5mcW4pO1xuICB9XG59KTtcblxuaW1wb3J0c0xpbnRlci5hZGQoe1xuICBjb2RlOiAnZnJvbS1zaWduYXR1cmUnLFxuICBtZXNzYWdlOiAnaW52YWxpZCBtZXRob2Qgc2lnbmF0dXJlIGZvciBmcm9tWHh4IG1ldGhvZCcsXG4gIGV2YWw6IGUgPT4ge1xuICAgIGZvciAoY29uc3QgbWV0aG9kIG9mIGUuY3R4LmZyb21NZXRob2RzKSB7XG5cbiAgICAgIC8vIFwiZnJvbVJvbGVBcm5cIiA9PiBcInJvbGVBcm5cIlxuICAgICAgY29uc3QgYXJnTmFtZSA9IGUuY3R4LnJlc291cmNlLmJhc2VuYW1lWzBdLnRvTG9jYWxlTG93ZXJDYXNlKCkgKyBtZXRob2QubmFtZS5zbGljZSgnZnJvbScubGVuZ3RoICsgMSk7XG5cbiAgICAgIGUuYXNzZXJ0U2lnbmF0dXJlKG1ldGhvZCwge1xuICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAgeyBuYW1lOiAnc2NvcGUnLCB0eXBlOiBlLmN0eC5yZXNvdXJjZS5jb25zdHJ1Y3QuUk9PVF9DTEFTUyB9LFxuICAgICAgICAgIHsgbmFtZTogJ2lkJywgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICB7IG5hbWU6IGFyZ05hbWUsIHR5cGU6ICdzdHJpbmcnIH1cbiAgICAgICAgXSxcbiAgICAgICAgcmV0dXJuczogZS5jdHgucmVzb3VyY2UuY29uc3RydWN0LmludGVyZmFjZVR5cGVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSk7XG5cbmltcG9ydHNMaW50ZXIuYWRkKHtcbiAgY29kZTogJ2Zyb20tYXR0cmlidXRlcycsXG4gIG1lc3NhZ2U6ICdzdGF0aWMgZnJvbVh4eEF0dHJpYnV0ZXMgaXMgYSBmYWN0b3J5IG9mIElYeHggZnJvbSBpdHMgcHJpbWl0aXZlIGF0dHJpYnV0ZXMnLFxuICBldmFsOiBlID0+IHtcbiAgICBpZiAoIWUuY3R4LmZyb21BdHRyaWJ1dGVzTWV0aG9kKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZS5hc3NlcnRTaWduYXR1cmUoZS5jdHguZnJvbUF0dHJpYnV0ZXNNZXRob2QsIHtcbiAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgeyBuYW1lOiAnc2NvcGUnLCB0eXBlOiBlLmN0eC5yZXNvdXJjZS5jb25zdHJ1Y3QuUk9PVF9DTEFTUyB9LFxuICAgICAgICB7IG5hbWU6ICdpZCcsIHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgIHsgbmFtZTogJ2F0dHJzJywgdHlwZTogZS5jdHguYXR0cmlidXRlc1N0cnVjdCB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5pbXBvcnRzTGludGVyLmFkZCh7XG4gIGNvZGU6ICdmcm9tLWF0dHJpYnV0ZXMtc3RydWN0JyxcbiAgbWVzc2FnZTogJ3Jlc291cmNlIHNob3VsZCBoYXZlIGFuIFh4eEF0dHJpYnV0ZXMgc3RydWN0JyxcbiAgZXZhbDogZSA9PiB7XG4gICAgaWYgKCFlLmN0eC5mcm9tQXR0cmlidXRlc01ldGhvZCkge1xuICAgICAgcmV0dXJuOyAvLyBubyBcImZyb21BdHRyaWJ1dGVzXCIgbWV0aG9kXG4gICAgfVxuXG4gICAgZS5hc3NlcnQoZS5jdHguYXR0cmlidXRlc1N0cnVjdCwgZS5jdHguYXR0cmlidXRlc1N0cnVjdE5hbWUpO1xuICB9XG59KTtcbiJdfQ==