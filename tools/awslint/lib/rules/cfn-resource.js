"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const camelcase = require("camelcase");
const linter_1 = require("../linter");
const core_types_1 = require("./core-types");
const resource_1 = require("./resource");
// this linter verifies that we have L2 coverage. it finds all "Cfn" classes and verifies
// that we have a corresponding L1 class for it that's identified as a resource.
exports.cfnResourceLinter = new linter_1.Linter(a => CfnResourceReflection.findAll(a));
exports.cfnResourceLinter.add({
    code: 'resource-class',
    message: `every resource must have a resource class (L2), add '@resource %s' to its docstring`,
    warning: true,
    eval: e => {
        const l2 = resource_1.ResourceReflection.findAll(e.ctx.classType.assembly).find(r => r.cfn.fullname === e.ctx.fullname);
        e.assert(l2, e.ctx.fullname, e.ctx.fullname);
    }
});
class CfnResourceReflection {
    constructor(cls) {
        this.classType = cls;
        this.basename = cls.name.substr('Cfn'.length);
        // HACK: extract full CFN name from initializer docs
        const initializerDoc = (cls.initializer && cls.initializer.docs.docs.summary) || '';
        const out = /a new `([^`]+)`/.exec(initializerDoc);
        const fullname = out && out[1];
        if (!fullname) {
            throw new Error(`Unable to extract CloudFormation resource name from initializer documentation of ${cls}`);
        }
        this.fullname = fullname;
        this.namespace = fullname.split('::').slice(0, 2).join('::');
        this.attributeNames = cls.ownProperties
            .filter(p => (p.docs.docs.custom || {}).cloudformationAttribute)
            .map(p => p.docs.customTag('cloudformationAttribute') || '<error>')
            .map(p => this.attributePropertyNameFromCfnName(p));
        this.doc = cls.docs.docs.see || '';
    }
    /**
     * Finds a Cfn resource class by full CloudFormation resource name (e.g. `AWS::S3::Bucket`)
     * @param fullName first two components are case-insensitive (e.g. `aws::s3::Bucket` is equivalent to `Aws::S3::Bucket`)
     */
    static findByName(sys, fullName) {
        var _a;
        for (const cls of sys.classes) {
            if (((_a = cls.docs.customTag('cloudformationResource')) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === fullName.toLocaleLowerCase()) {
                return new CfnResourceReflection(cls);
            }
        }
        return undefined;
    }
    /**
     * Returns all CFN resource classes within an assembly.
     */
    static findAll(assembly) {
        return assembly.classes
            .filter(c => core_types_1.CoreTypes.isCfnResource(c))
            .map(c => new CfnResourceReflection(c));
    }
    attributePropertyNameFromCfnName(name) {
        // special case (someone was smart), special case copied from cfn2ts
        if (this.basename === 'SecurityGroup' && name === 'GroupId') {
            return 'Id';
        }
        return camelcase(name, { pascalCase: true });
    }
}
exports.CfnResourceReflection = CfnResourceReflection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2ZuLXJlc291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2ZuLXJlc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXVDO0FBRXZDLHNDQUFtQztBQUNuQyw2Q0FBeUM7QUFDekMseUNBQWdEO0FBRWhELHlGQUF5RjtBQUN6RixnRkFBZ0Y7QUFDbkUsUUFBQSxpQkFBaUIsR0FBRyxJQUFJLGVBQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRW5GLHlCQUFpQixDQUFDLEdBQUcsQ0FBQztJQUNwQixJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLE9BQU8sRUFBRSxxRkFBcUY7SUFDOUYsT0FBTyxFQUFFLElBQUk7SUFDYixJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUU7UUFDUixNQUFNLEVBQUUsR0FBRyw2QkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3RyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDRixDQUFDLENBQUM7QUFFSCxNQUFhLHFCQUFxQjtJQStCaEMsWUFBWSxHQUFzQjtRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUVyQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5QyxvREFBb0Q7UUFDcEQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEYsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sUUFBUSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsb0ZBQW9GLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDNUc7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUV6QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsYUFBYTthQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQzthQUMvRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLFNBQVMsQ0FBQzthQUNsRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0RCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQXJERDs7O09BR0c7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQXVCLEVBQUUsUUFBZ0I7O1FBQ2hFLEtBQUssTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUM3QixJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsMENBQUUsaUJBQWlCLFFBQU8sUUFBUSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ3RHLE9BQU8sSUFBSSxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QztTQUNGO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUEwQjtRQUM5QyxPQUFPLFFBQVEsQ0FBQyxPQUFPO2FBQ3BCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLHNCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUkscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBa0NPLGdDQUFnQyxDQUFDLElBQVk7UUFFbkQsb0VBQW9FO1FBQ3BFLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxlQUFlLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUMzRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNGO0FBakVELHNEQWlFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNhbWVsY2FzZSBmcm9tICdjYW1lbGNhc2UnO1xuaW1wb3J0ICogYXMgcmVmbGVjdCBmcm9tICdqc2lpLXJlZmxlY3QnO1xuaW1wb3J0IHsgTGludGVyIH0gZnJvbSAnLi4vbGludGVyJztcbmltcG9ydCB7IENvcmVUeXBlcyB9IGZyb20gJy4vY29yZS10eXBlcyc7XG5pbXBvcnQgeyBSZXNvdXJjZVJlZmxlY3Rpb24gfSBmcm9tICcuL3Jlc291cmNlJztcblxuLy8gdGhpcyBsaW50ZXIgdmVyaWZpZXMgdGhhdCB3ZSBoYXZlIEwyIGNvdmVyYWdlLiBpdCBmaW5kcyBhbGwgXCJDZm5cIiBjbGFzc2VzIGFuZCB2ZXJpZmllc1xuLy8gdGhhdCB3ZSBoYXZlIGEgY29ycmVzcG9uZGluZyBMMSBjbGFzcyBmb3IgaXQgdGhhdCdzIGlkZW50aWZpZWQgYXMgYSByZXNvdXJjZS5cbmV4cG9ydCBjb25zdCBjZm5SZXNvdXJjZUxpbnRlciA9IG5ldyBMaW50ZXIoYSA9PiBDZm5SZXNvdXJjZVJlZmxlY3Rpb24uZmluZEFsbChhKSk7XG5cbmNmblJlc291cmNlTGludGVyLmFkZCh7XG4gIGNvZGU6ICdyZXNvdXJjZS1jbGFzcycsXG4gIG1lc3NhZ2U6IGBldmVyeSByZXNvdXJjZSBtdXN0IGhhdmUgYSByZXNvdXJjZSBjbGFzcyAoTDIpLCBhZGQgJ0ByZXNvdXJjZSAlcycgdG8gaXRzIGRvY3N0cmluZ2AsXG4gIHdhcm5pbmc6IHRydWUsXG4gIGV2YWw6IGUgPT4ge1xuICAgIGNvbnN0IGwyID0gUmVzb3VyY2VSZWZsZWN0aW9uLmZpbmRBbGwoZS5jdHguY2xhc3NUeXBlLmFzc2VtYmx5KS5maW5kKHIgPT4gci5jZm4uZnVsbG5hbWUgPT09IGUuY3R4LmZ1bGxuYW1lKTtcbiAgICBlLmFzc2VydChsMiwgZS5jdHguZnVsbG5hbWUsIGUuY3R4LmZ1bGxuYW1lKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBjbGFzcyBDZm5SZXNvdXJjZVJlZmxlY3Rpb24ge1xuICAvKipcbiAgICogRmluZHMgYSBDZm4gcmVzb3VyY2UgY2xhc3MgYnkgZnVsbCBDbG91ZEZvcm1hdGlvbiByZXNvdXJjZSBuYW1lIChlLmcuIGBBV1M6OlMzOjpCdWNrZXRgKVxuICAgKiBAcGFyYW0gZnVsbE5hbWUgZmlyc3QgdHdvIGNvbXBvbmVudHMgYXJlIGNhc2UtaW5zZW5zaXRpdmUgKGUuZy4gYGF3czo6czM6OkJ1Y2tldGAgaXMgZXF1aXZhbGVudCB0byBgQXdzOjpTMzo6QnVja2V0YClcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZmluZEJ5TmFtZShzeXM6IHJlZmxlY3QuVHlwZVN5c3RlbSwgZnVsbE5hbWU6IHN0cmluZykge1xuICAgIGZvciAoY29uc3QgY2xzIG9mIHN5cy5jbGFzc2VzKSB7XG4gICAgICBpZiAoY2xzLmRvY3MuY3VzdG9tVGFnKCdjbG91ZGZvcm1hdGlvblJlc291cmNlJyk/LnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09IGZ1bGxOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDZm5SZXNvdXJjZVJlZmxlY3Rpb24oY2xzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIENGTiByZXNvdXJjZSBjbGFzc2VzIHdpdGhpbiBhbiBhc3NlbWJseS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZmluZEFsbChhc3NlbWJseTogcmVmbGVjdC5Bc3NlbWJseSkge1xuICAgIHJldHVybiBhc3NlbWJseS5jbGFzc2VzXG4gICAgICAuZmlsdGVyKGMgPT4gQ29yZVR5cGVzLmlzQ2ZuUmVzb3VyY2UoYykpXG4gICAgICAubWFwKGMgPT4gbmV3IENmblJlc291cmNlUmVmbGVjdGlvbihjKSk7XG4gIH1cblxuICBwdWJsaWMgcmVhZG9ubHkgY2xhc3NUeXBlOiByZWZsZWN0LkNsYXNzVHlwZTtcbiAgcHVibGljIHJlYWRvbmx5IGZ1bGxuYW1lOiBzdHJpbmc7IC8vIEFXUzo6UzM6OkJ1Y2tldFxuICBwdWJsaWMgcmVhZG9ubHkgbmFtZXNwYWNlOiBzdHJpbmc7IC8vIEFXUzo6UzNcbiAgcHVibGljIHJlYWRvbmx5IGJhc2VuYW1lOiBzdHJpbmc7IC8vIEJ1Y2tldFxuICBwdWJsaWMgcmVhZG9ubHkgYXR0cmlidXRlTmFtZXM6IHN0cmluZ1tdOyAvLyAobm9ybWFsaXplZCkgYnVja2V0QXJuLCBidWNrZXROYW1lLCBxdWV1ZVVybFxuICBwdWJsaWMgcmVhZG9ubHkgZG9jOiBzdHJpbmc7IC8vIGxpbmsgdG8gQ2xvdWRGb3JtYXRpb24gZG9jc1xuXG4gIGNvbnN0cnVjdG9yKGNsczogcmVmbGVjdC5DbGFzc1R5cGUpIHtcbiAgICB0aGlzLmNsYXNzVHlwZSA9IGNscztcblxuICAgIHRoaXMuYmFzZW5hbWUgPSBjbHMubmFtZS5zdWJzdHIoJ0NmbicubGVuZ3RoKTtcblxuICAgIC8vIEhBQ0s6IGV4dHJhY3QgZnVsbCBDRk4gbmFtZSBmcm9tIGluaXRpYWxpemVyIGRvY3NcbiAgICBjb25zdCBpbml0aWFsaXplckRvYyA9IChjbHMuaW5pdGlhbGl6ZXIgJiYgY2xzLmluaXRpYWxpemVyLmRvY3MuZG9jcy5zdW1tYXJ5KSB8fCAnJztcbiAgICBjb25zdCBvdXQgPSAvYSBuZXcgYChbXmBdKylgLy5leGVjKGluaXRpYWxpemVyRG9jKTtcbiAgICBjb25zdCBmdWxsbmFtZSA9IG91dCAmJiBvdXRbMV07XG4gICAgaWYgKCFmdWxsbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gZXh0cmFjdCBDbG91ZEZvcm1hdGlvbiByZXNvdXJjZSBuYW1lIGZyb20gaW5pdGlhbGl6ZXIgZG9jdW1lbnRhdGlvbiBvZiAke2Nsc31gKTtcbiAgICB9XG5cbiAgICB0aGlzLmZ1bGxuYW1lID0gZnVsbG5hbWU7XG5cbiAgICB0aGlzLm5hbWVzcGFjZSA9IGZ1bGxuYW1lLnNwbGl0KCc6OicpLnNsaWNlKDAsIDIpLmpvaW4oJzo6Jyk7XG5cbiAgICB0aGlzLmF0dHJpYnV0ZU5hbWVzID0gY2xzLm93blByb3BlcnRpZXNcbiAgICAgIC5maWx0ZXIocCA9PiAocC5kb2NzLmRvY3MuY3VzdG9tIHx8IHt9KS5jbG91ZGZvcm1hdGlvbkF0dHJpYnV0ZSlcbiAgICAgIC5tYXAocCA9PiBwLmRvY3MuY3VzdG9tVGFnKCdjbG91ZGZvcm1hdGlvbkF0dHJpYnV0ZScpIHx8ICc8ZXJyb3I+JylcbiAgICAgIC5tYXAocCA9PiB0aGlzLmF0dHJpYnV0ZVByb3BlcnR5TmFtZUZyb21DZm5OYW1lKHApKTtcblxuICAgIHRoaXMuZG9jID0gY2xzLmRvY3MuZG9jcy5zZWUgfHwgJyc7XG4gIH1cblxuICBwcml2YXRlIGF0dHJpYnV0ZVByb3BlcnR5TmFtZUZyb21DZm5OYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAvLyBzcGVjaWFsIGNhc2UgKHNvbWVvbmUgd2FzIHNtYXJ0KSwgc3BlY2lhbCBjYXNlIGNvcGllZCBmcm9tIGNmbjJ0c1xuICAgIGlmICh0aGlzLmJhc2VuYW1lID09PSAnU2VjdXJpdHlHcm91cCcgJiYgbmFtZSA9PT0gJ0dyb3VwSWQnKSB7XG4gICAgICByZXR1cm4gJ0lkJztcbiAgICB9XG5cbiAgICByZXR1cm4gY2FtZWxjYXNlKG5hbWUsIHsgcGFzY2FsQ2FzZTogdHJ1ZSB9KTtcbiAgfVxufVxuIl19