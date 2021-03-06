"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linter_1 = require("../linter");
const api_1 = require("./api");
const attributes_1 = require("./attributes");
const cfn_resource_1 = require("./cfn-resource");
const cloudwatch_events_1 = require("./cloudwatch-events");
const construct_1 = require("./construct");
const docs_1 = require("./docs");
const durations_1 = require("./durations");
const exports_1 = require("./exports");
const imports_1 = require("./imports");
const integrations_1 = require("./integrations");
const module_1 = require("./module");
const no_unused_type_1 = require("./no-unused-type");
const public_static_properties_1 = require("./public-static-properties");
const resource_1 = require("./resource");
exports.ALL_RULES_LINTER = new linter_1.AggregateLinter(module_1.moduleLinter, construct_1.constructLinter, cfn_resource_1.cfnResourceLinter, resource_1.resourceLinter, api_1.apiLinter, imports_1.importsLinter, attributes_1.attributesLinter, exports_1.exportsLinter, cloudwatch_events_1.eventsLinter, integrations_1.integrationLinter, no_unused_type_1.noUnusedTypeLinter, durations_1.durationsLinter, public_static_properties_1.publicStaticPropertiesLinter, docs_1.docsLinter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0QztBQUM1QywrQkFBa0M7QUFDbEMsNkNBQWdEO0FBQ2hELGlEQUFtRDtBQUNuRCwyREFBbUQ7QUFDbkQsMkNBQThDO0FBQzlDLGlDQUFvQztBQUNwQywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBQzFDLHVDQUEwQztBQUMxQyxpREFBbUQ7QUFDbkQscUNBQXdDO0FBQ3hDLHFEQUFzRDtBQUN0RCx5RUFBMEU7QUFDMUUseUNBQTRDO0FBRS9CLFFBQUEsZ0JBQWdCLEdBQUcsSUFBSSx3QkFBZSxDQUNqRCxxQkFBWSxFQUNaLDJCQUFlLEVBQ2YsZ0NBQWlCLEVBQ2pCLHlCQUFjLEVBQ2QsZUFBUyxFQUNULHVCQUFhLEVBQ2IsNkJBQWdCLEVBQ2hCLHVCQUFhLEVBQ2IsZ0NBQVksRUFDWixnQ0FBaUIsRUFDakIsbUNBQWtCLEVBQ2xCLDJCQUFlLEVBQ2YsdURBQTRCLEVBQzVCLGlCQUFVLENBQ1gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnZ3JlZ2F0ZUxpbnRlciB9IGZyb20gJy4uL2xpbnRlcic7XG5pbXBvcnQgeyBhcGlMaW50ZXIgfSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgeyBhdHRyaWJ1dGVzTGludGVyIH0gZnJvbSAnLi9hdHRyaWJ1dGVzJztcbmltcG9ydCB7IGNmblJlc291cmNlTGludGVyIH0gZnJvbSAnLi9jZm4tcmVzb3VyY2UnO1xuaW1wb3J0IHsgZXZlbnRzTGludGVyIH0gZnJvbSAnLi9jbG91ZHdhdGNoLWV2ZW50cyc7XG5pbXBvcnQgeyBjb25zdHJ1Y3RMaW50ZXIgfSBmcm9tICcuL2NvbnN0cnVjdCc7XG5pbXBvcnQgeyBkb2NzTGludGVyIH0gZnJvbSAnLi9kb2NzJztcbmltcG9ydCB7IGR1cmF0aW9uc0xpbnRlciB9IGZyb20gJy4vZHVyYXRpb25zJztcbmltcG9ydCB7IGV4cG9ydHNMaW50ZXIgfSBmcm9tICcuL2V4cG9ydHMnO1xuaW1wb3J0IHsgaW1wb3J0c0xpbnRlciB9IGZyb20gJy4vaW1wb3J0cyc7XG5pbXBvcnQgeyBpbnRlZ3JhdGlvbkxpbnRlciB9IGZyb20gJy4vaW50ZWdyYXRpb25zJztcbmltcG9ydCB7IG1vZHVsZUxpbnRlciB9IGZyb20gJy4vbW9kdWxlJztcbmltcG9ydCB7IG5vVW51c2VkVHlwZUxpbnRlciB9IGZyb20gJy4vbm8tdW51c2VkLXR5cGUnO1xuaW1wb3J0IHsgcHVibGljU3RhdGljUHJvcGVydGllc0xpbnRlciB9IGZyb20gJy4vcHVibGljLXN0YXRpYy1wcm9wZXJ0aWVzJztcbmltcG9ydCB7IHJlc291cmNlTGludGVyIH0gZnJvbSAnLi9yZXNvdXJjZSc7XG5cbmV4cG9ydCBjb25zdCBBTExfUlVMRVNfTElOVEVSID0gbmV3IEFnZ3JlZ2F0ZUxpbnRlcihcbiAgbW9kdWxlTGludGVyLFxuICBjb25zdHJ1Y3RMaW50ZXIsXG4gIGNmblJlc291cmNlTGludGVyLFxuICByZXNvdXJjZUxpbnRlcixcbiAgYXBpTGludGVyLFxuICBpbXBvcnRzTGludGVyLFxuICBhdHRyaWJ1dGVzTGludGVyLFxuICBleHBvcnRzTGludGVyLFxuICBldmVudHNMaW50ZXIsXG4gIGludGVncmF0aW9uTGludGVyLFxuICBub1VudXNlZFR5cGVMaW50ZXIsXG4gIGR1cmF0aW9uc0xpbnRlcixcbiAgcHVibGljU3RhdGljUHJvcGVydGllc0xpbnRlcixcbiAgZG9jc0xpbnRlclxuKTsiXX0=