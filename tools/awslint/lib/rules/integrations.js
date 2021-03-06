"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linter_1 = require("../linter");
const util_1 = require("./util");
exports.integrationLinter = new linter_1.Linter(assembly => assembly.interfaces
    .filter(IntegrationReflection.isIntegrationInterface)
    .map(construct => new IntegrationReflection(construct)));
const BIND_METHOD_NAME = 'bind';
class IntegrationReflection {
    constructor(integrationInterface) {
        this.integrationInterface = integrationInterface;
    }
    static isIntegrationInterface(x) {
        return x.allMethods.some(m => m.name === BIND_METHOD_NAME);
    }
    get bindMethod() {
        return this.integrationInterface.allMethods.find(m => m.name === BIND_METHOD_NAME);
    }
}
exports.integrationLinter.add({
    code: 'integ-return-type',
    message: `'bind(...)' should return a type named 'XxxConfig'`,
    eval: e => {
        const returnsFqn = e.ctx.bindMethod.returns.type.fqn;
        e.assert(returnsFqn && returnsFqn.endsWith('Config'), util_1.memberFqn(e.ctx.bindMethod));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdyYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZWdyYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQW1DO0FBQ25DLGlDQUFtQztBQUV0QixRQUFBLGlCQUFpQixHQUFHLElBQUksZUFBTSxDQUF3QixRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVO0tBQy9GLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxzQkFBc0IsQ0FBQztLQUNwRCxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUzRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztBQUVoQyxNQUFNLHFCQUFxQjtJQUt6QixZQUE0QixvQkFBMkM7UUFBM0MseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtJQUN2RSxDQUFDO0lBTE0sTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQXdCO1FBQzNELE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLGdCQUFnQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUtELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxnQkFBZ0IsQ0FBRSxDQUFDO0lBQ3RGLENBQUM7Q0FDRjtBQUVELHlCQUFpQixDQUFDLEdBQUcsQ0FBQztJQUNwQixJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLE9BQU8sRUFBRSxvREFBb0Q7SUFDN0QsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQ1IsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFckQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxnQkFBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcmVmbGVjdCBmcm9tICdqc2lpLXJlZmxlY3QnO1xuaW1wb3J0IHsgTGludGVyIH0gZnJvbSAnLi4vbGludGVyJztcbmltcG9ydCB7IG1lbWJlckZxbiB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjb25zdCBpbnRlZ3JhdGlvbkxpbnRlciA9IG5ldyBMaW50ZXI8SW50ZWdyYXRpb25SZWZsZWN0aW9uPihhc3NlbWJseSA9PiBhc3NlbWJseS5pbnRlcmZhY2VzXG4gIC5maWx0ZXIoSW50ZWdyYXRpb25SZWZsZWN0aW9uLmlzSW50ZWdyYXRpb25JbnRlcmZhY2UpXG4gIC5tYXAoY29uc3RydWN0ID0+IG5ldyBJbnRlZ3JhdGlvblJlZmxlY3Rpb24oY29uc3RydWN0KSkpO1xuXG5jb25zdCBCSU5EX01FVEhPRF9OQU1FID0gJ2JpbmQnO1xuXG5jbGFzcyBJbnRlZ3JhdGlvblJlZmxlY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIGlzSW50ZWdyYXRpb25JbnRlcmZhY2UoeDogcmVmbGVjdC5JbnRlcmZhY2VUeXBlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHguYWxsTWV0aG9kcy5zb21lKG0gPT4gbS5uYW1lID09PSBCSU5EX01FVEhPRF9OQU1FKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBpbnRlZ3JhdGlvbkludGVyZmFjZTogcmVmbGVjdC5JbnRlcmZhY2VUeXBlKSB7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGJpbmRNZXRob2QoKTogcmVmbGVjdC5NZXRob2Qge1xuICAgIHJldHVybiB0aGlzLmludGVncmF0aW9uSW50ZXJmYWNlLmFsbE1ldGhvZHMuZmluZChtID0+IG0ubmFtZSA9PT0gQklORF9NRVRIT0RfTkFNRSkhO1xuICB9XG59XG5cbmludGVncmF0aW9uTGludGVyLmFkZCh7XG4gIGNvZGU6ICdpbnRlZy1yZXR1cm4tdHlwZScsXG4gIG1lc3NhZ2U6IGAnYmluZCguLi4pJyBzaG91bGQgcmV0dXJuIGEgdHlwZSBuYW1lZCAnWHh4Q29uZmlnJ2AsXG4gIGV2YWw6IGUgPT4ge1xuICAgIGNvbnN0IHJldHVybnNGcW4gPSBlLmN0eC5iaW5kTWV0aG9kLnJldHVybnMudHlwZS5mcW47XG5cbiAgICBlLmFzc2VydChyZXR1cm5zRnFuICYmIHJldHVybnNGcW4uZW5kc1dpdGgoJ0NvbmZpZycpLCBtZW1iZXJGcW4oZS5jdHguYmluZE1ldGhvZCkpO1xuICB9XG59KTtcbiJdfQ==