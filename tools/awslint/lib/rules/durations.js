"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linter_1 = require("../linter");
const DURATION_FQN = '@aws-cdk/core.Duration';
const DURATION_SUFFIX = /(Days|Milli(?:(?:S|s)econd)?s?|Sec(?:ond)?s?)$/;
exports.durationsLinter = new linter_1.Linter(assm => {
    const result = new Array();
    const generatedClassesPrefix = `${assm.name}.Cfn`;
    for (const type of assm.types) {
        // L1 classes are exempted from this rule, doing basic name matching here...
        if (type.fqn.startsWith(generatedClassesPrefix)) {
            continue;
        }
        if (!type.isClassType() && !type.isDataType() && !type.isInterfaceType()) {
            continue;
        }
        for (const property of type.allProperties) {
            if (isDurationProperty(property)) {
                result.push(property);
            }
        }
    }
    return result;
    function isDurationProperty(prop) {
        const lowerCaseName = prop.name.toLowerCase();
        // No lookbehind in JS regexes, so excluding "*PerSecond" by hand here...
        return (DURATION_SUFFIX.test(prop.name) && !/PerSecond$/.test(prop.name))
            || lowerCaseName.endsWith('duration')
            || lowerCaseName.endsWith('period')
            || lowerCaseName.endsWith('timeout')
            || lowerCaseName.endsWith('ttl')
            || prop.type.fqn === DURATION_FQN;
    }
});
exports.durationsLinter.add({
    code: 'duration-prop-type',
    message: `property must be typed ${DURATION_FQN}`,
    eval: evaluation => {
        evaluation.assert(evaluation.ctx.type.fqn === DURATION_FQN, `${evaluation.ctx.parentType.fqn}.${evaluation.ctx.name}`);
    },
});
exports.durationsLinter.add({
    code: 'duration-prop-name',
    message: 'property must not use time-unit suffix',
    eval: evaluation => {
        evaluation.assert(!DURATION_SUFFIX.test(evaluation.ctx.name), `${evaluation.ctx.parentType.fqn}.${evaluation.ctx.name}`, `(suggested name: "${evaluation.ctx.name.replace(DURATION_SUFFIX, '')}")`);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVyYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHVyYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQW1DO0FBRW5DLE1BQU0sWUFBWSxHQUFHLHdCQUF3QixDQUFDO0FBQzlDLE1BQU0sZUFBZSxHQUFHLGdEQUFnRCxDQUFDO0FBRTVELFFBQUEsZUFBZSxHQUFHLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksS0FBSyxFQUFZLENBQUM7SUFDckMsTUFBTSxzQkFBc0IsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQztJQUNsRCxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDN0IsNEVBQTRFO1FBQzVFLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsRUFBRTtZQUFFLFNBQVM7U0FBRTtRQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQUUsU0FBUztTQUFFO1FBQ3ZGLEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN6QyxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZCO1NBQ0Y7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDO0lBRWQsU0FBUyxrQkFBa0IsQ0FBQyxJQUFjO1FBQ3hDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUMseUVBQXlFO1FBQ3pFLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2VBQ3BFLGFBQWEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO2VBQ2xDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2VBQ2hDLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO2VBQ2pDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2VBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLFlBQVksQ0FBQztJQUN0QyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCx1QkFBZSxDQUFDLEdBQUcsQ0FBQztJQUNsQixJQUFJLEVBQUUsb0JBQW9CO0lBQzFCLE9BQU8sRUFBRSwwQkFBMEIsWUFBWSxFQUFFO0lBQ2pELElBQUksRUFBRSxVQUFVLENBQUMsRUFBRTtRQUNqQixVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxZQUFZLEVBQ3hELEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsdUJBQWUsQ0FBQyxHQUFHLENBQUM7SUFDbEIsSUFBSSxFQUFFLG9CQUFvQjtJQUMxQixPQUFPLEVBQUUsd0NBQXdDO0lBQ2pELElBQUksRUFBRSxVQUFVLENBQUMsRUFBRTtRQUNqQixVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUMxRCxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUN6RCxxQkFBcUIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0UsQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSAnanNpaS1yZWZsZWN0JztcbmltcG9ydCB7IExpbnRlciB9IGZyb20gJy4uL2xpbnRlcic7XG5cbmNvbnN0IERVUkFUSU9OX0ZRTiA9ICdAYXdzLWNkay9jb3JlLkR1cmF0aW9uJztcbmNvbnN0IERVUkFUSU9OX1NVRkZJWCA9IC8oRGF5c3xNaWxsaSg/Oig/OlN8cyllY29uZCk/cz98U2VjKD86b25kKT9zPykkLztcblxuZXhwb3J0IGNvbnN0IGR1cmF0aW9uc0xpbnRlciA9IG5ldyBMaW50ZXIoYXNzbSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheTxQcm9wZXJ0eT4oKTtcbiAgY29uc3QgZ2VuZXJhdGVkQ2xhc3Nlc1ByZWZpeCA9IGAke2Fzc20ubmFtZX0uQ2ZuYDtcbiAgZm9yIChjb25zdCB0eXBlIG9mIGFzc20udHlwZXMpIHtcbiAgICAvLyBMMSBjbGFzc2VzIGFyZSBleGVtcHRlZCBmcm9tIHRoaXMgcnVsZSwgZG9pbmcgYmFzaWMgbmFtZSBtYXRjaGluZyBoZXJlLi4uXG4gICAgaWYgKHR5cGUuZnFuLnN0YXJ0c1dpdGgoZ2VuZXJhdGVkQ2xhc3Nlc1ByZWZpeCkpIHsgY29udGludWU7IH1cbiAgICBpZiAoIXR5cGUuaXNDbGFzc1R5cGUoKSAmJiAhdHlwZS5pc0RhdGFUeXBlKCkgJiYgIXR5cGUuaXNJbnRlcmZhY2VUeXBlKCkpIHsgY29udGludWU7IH1cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIHR5cGUuYWxsUHJvcGVydGllcykge1xuICAgICAgaWYgKGlzRHVyYXRpb25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2gocHJvcGVydHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xuXG4gIGZ1bmN0aW9uIGlzRHVyYXRpb25Qcm9wZXJ0eShwcm9wOiBQcm9wZXJ0eSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGxvd2VyQ2FzZU5hbWUgPSBwcm9wLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAvLyBObyBsb29rYmVoaW5kIGluIEpTIHJlZ2V4ZXMsIHNvIGV4Y2x1ZGluZyBcIipQZXJTZWNvbmRcIiBieSBoYW5kIGhlcmUuLi5cbiAgICByZXR1cm4gKERVUkFUSU9OX1NVRkZJWC50ZXN0KHByb3AubmFtZSkgJiYgIS9QZXJTZWNvbmQkLy50ZXN0KHByb3AubmFtZSkpXG4gICAgICB8fCBsb3dlckNhc2VOYW1lLmVuZHNXaXRoKCdkdXJhdGlvbicpXG4gICAgICB8fCBsb3dlckNhc2VOYW1lLmVuZHNXaXRoKCdwZXJpb2QnKVxuICAgICAgfHwgbG93ZXJDYXNlTmFtZS5lbmRzV2l0aCgndGltZW91dCcpXG4gICAgICB8fCBsb3dlckNhc2VOYW1lLmVuZHNXaXRoKCd0dGwnKVxuICAgICAgfHwgcHJvcC50eXBlLmZxbiA9PT0gRFVSQVRJT05fRlFOO1xuICB9XG59KTtcblxuZHVyYXRpb25zTGludGVyLmFkZCh7XG4gIGNvZGU6ICdkdXJhdGlvbi1wcm9wLXR5cGUnLFxuICBtZXNzYWdlOiBgcHJvcGVydHkgbXVzdCBiZSB0eXBlZCAke0RVUkFUSU9OX0ZRTn1gLFxuICBldmFsOiBldmFsdWF0aW9uID0+IHtcbiAgICBldmFsdWF0aW9uLmFzc2VydChldmFsdWF0aW9uLmN0eC50eXBlLmZxbiA9PT0gRFVSQVRJT05fRlFOLFxuICAgICAgYCR7ZXZhbHVhdGlvbi5jdHgucGFyZW50VHlwZS5mcW59LiR7ZXZhbHVhdGlvbi5jdHgubmFtZX1gKTtcbiAgfSxcbn0pO1xuXG5kdXJhdGlvbnNMaW50ZXIuYWRkKHtcbiAgY29kZTogJ2R1cmF0aW9uLXByb3AtbmFtZScsXG4gIG1lc3NhZ2U6ICdwcm9wZXJ0eSBtdXN0IG5vdCB1c2UgdGltZS11bml0IHN1ZmZpeCcsXG4gIGV2YWw6IGV2YWx1YXRpb24gPT4ge1xuICAgIGV2YWx1YXRpb24uYXNzZXJ0KCFEVVJBVElPTl9TVUZGSVgudGVzdChldmFsdWF0aW9uLmN0eC5uYW1lKSxcbiAgICAgIGAke2V2YWx1YXRpb24uY3R4LnBhcmVudFR5cGUuZnFufS4ke2V2YWx1YXRpb24uY3R4Lm5hbWV9YCxcbiAgICAgIGAoc3VnZ2VzdGVkIG5hbWU6IFwiJHtldmFsdWF0aW9uLmN0eC5uYW1lLnJlcGxhY2UoRFVSQVRJT05fU1VGRklYLCAnJyl9XCIpYCk7XG4gIH0sXG59KTtcbiJdfQ==