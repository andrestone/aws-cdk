"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linter_1 = require("../linter");
const resource_1 = require("./resource");
exports.attributesLinter = new linter_1.Linter(a => {
    const result = new Array();
    for (const resource of resource_1.ResourceReflection.findAll(a)) {
        for (const attr of resource.attributes) {
            result.push(new AttributeReflection(resource, attr));
        }
    }
    return result;
});
class AttributeReflection {
    constructor(resource, attr) {
        this.resource = resource;
        this.attr = attr;
        this.fqn = resource.fqn + '.' + attr.property.name;
    }
}
exports.attributesLinter.add({
    code: 'attribute-readonly',
    message: 'attribute property must be readonly',
    eval: e => {
        e.assert(e.ctx.attr.property.immutable, e.ctx.fqn);
    }
});
exports.attributesLinter.add({
    code: 'attribute-tag',
    message: 'attribute properties must have an "@attribute" doctag on: ',
    eval: e => {
        const tag = e.ctx.attr.property.docs.customTag('attribute');
        e.assert(tag, e.ctx.fqn, `${e.ctx.attr.property.parentType.fqn}.${e.ctx.attr.property.name}`);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0dHJpYnV0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBbUM7QUFDbkMseUNBQTJEO0FBRTlDLFFBQUEsZ0JBQWdCLEdBQUcsSUFBSSxlQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQXVCLENBQUM7SUFDaEQsS0FBSyxNQUFNLFFBQVEsSUFBSSw2QkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDcEQsS0FBSyxNQUFNLElBQUksSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN0RDtLQUNGO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLG1CQUFtQjtJQUd2QixZQUE0QixRQUE0QixFQUFrQixJQUFlO1FBQTdELGFBQVEsR0FBUixRQUFRLENBQW9CO1FBQWtCLFNBQUksR0FBSixJQUFJLENBQVc7UUFDdkYsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUNyRCxDQUFDO0NBQ0Y7QUFFRCx3QkFBZ0IsQ0FBQyxHQUFHLENBQUM7SUFDbkIsSUFBSSxFQUFFLG9CQUFvQjtJQUMxQixPQUFPLEVBQUUscUNBQXFDO0lBQzlDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRTtRQUNSLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDRixDQUFDLENBQUM7QUFFSCx3QkFBZ0IsQ0FBQyxHQUFHLENBQUM7SUFDbkIsSUFBSSxFQUFFLGVBQWU7SUFDckIsT0FBTyxFQUFFLDREQUE0RDtJQUNyRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUU7UUFDUixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaW50ZXIgfSBmcm9tICcuLi9saW50ZXInO1xuaW1wb3J0IHsgQXR0cmlidXRlLCBSZXNvdXJjZVJlZmxlY3Rpb24gfSBmcm9tICcuL3Jlc291cmNlJztcblxuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZXNMaW50ZXIgPSBuZXcgTGludGVyKGEgPT4ge1xuICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXk8QXR0cmlidXRlUmVmbGVjdGlvbj4oKTtcbiAgZm9yIChjb25zdCByZXNvdXJjZSBvZiBSZXNvdXJjZVJlZmxlY3Rpb24uZmluZEFsbChhKSkge1xuICAgIGZvciAoY29uc3QgYXR0ciBvZiByZXNvdXJjZS5hdHRyaWJ1dGVzKSB7XG4gICAgICByZXN1bHQucHVzaChuZXcgQXR0cmlidXRlUmVmbGVjdGlvbihyZXNvdXJjZSwgYXR0cikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbmNsYXNzIEF0dHJpYnV0ZVJlZmxlY3Rpb24ge1xuICBwdWJsaWMgcmVhZG9ubHkgZnFuOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHJlc291cmNlOiBSZXNvdXJjZVJlZmxlY3Rpb24sIHB1YmxpYyByZWFkb25seSBhdHRyOiBBdHRyaWJ1dGUpIHtcbiAgICB0aGlzLmZxbiA9IHJlc291cmNlLmZxbiArICcuJyArIGF0dHIucHJvcGVydHkubmFtZTtcbiAgfVxufVxuXG5hdHRyaWJ1dGVzTGludGVyLmFkZCh7XG4gIGNvZGU6ICdhdHRyaWJ1dGUtcmVhZG9ubHknLFxuICBtZXNzYWdlOiAnYXR0cmlidXRlIHByb3BlcnR5IG11c3QgYmUgcmVhZG9ubHknLFxuICBldmFsOiBlID0+IHtcbiAgICBlLmFzc2VydChlLmN0eC5hdHRyLnByb3BlcnR5LmltbXV0YWJsZSwgZS5jdHguZnFuKTtcbiAgfVxufSk7XG5cbmF0dHJpYnV0ZXNMaW50ZXIuYWRkKHtcbiAgY29kZTogJ2F0dHJpYnV0ZS10YWcnLFxuICBtZXNzYWdlOiAnYXR0cmlidXRlIHByb3BlcnRpZXMgbXVzdCBoYXZlIGFuIFwiQGF0dHJpYnV0ZVwiIGRvY3RhZyBvbjogJyxcbiAgZXZhbDogZSA9PiB7XG4gICAgY29uc3QgdGFnID0gZS5jdHguYXR0ci5wcm9wZXJ0eS5kb2NzLmN1c3RvbVRhZygnYXR0cmlidXRlJyk7XG4gICAgZS5hc3NlcnQodGFnLCBlLmN0eC5mcW4sIGAke2UuY3R4LmF0dHIucHJvcGVydHkucGFyZW50VHlwZS5mcW59LiR7ZS5jdHguYXR0ci5wcm9wZXJ0eS5uYW1lfWApO1xuICB9XG59KTtcbiJdfQ==