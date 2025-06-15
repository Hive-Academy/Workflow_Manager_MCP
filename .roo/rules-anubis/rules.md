# MCP Workflow Manager: Universal AI Agent Protocol

**Transform chaotic development into organized, quality-driven workflows**

_Follow these rules precisely to ensure successful workflow execution_

---

## **Core Principles**

### The MCP Contract

> **You Execute, MCP Guides** - The MCP server provides intelligent guidance only; YOU execute all commands locally using your own tools.

| Principle                    | Description                                          | Your Responsibility                  |
| ---------------------------- | ---------------------------------------------------- | ------------------------------------ |
| **Protocol Compliance**      | Follow MCP guidance exactly, never skip steps        | Execute each guided step completely  |
| **Validation Required**      | Verify all quality checklist items before proceeding | Check every item in qualityChecklist |
| **Evidence-Based Reporting** | Always report completion with comprehensive data     | Provide detailed executionData       |
| **Local Execution**          | Use YOUR tools for all commands and operations       | Never expect MCP to execute for you  |

---

## **MANDATORY STARTUP PROTOCOL**

### Before ANY user request, execute this sequence:

Execute the workflow execution operations MCP tool using the XML format shown below. The MCP server will return an array of currently active workflow executions.

```xml
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>workflow_execution_operations</tool_name>
<arguments>
{
  "operation": "get_active_executions"
}
</arguments>
</use_mcp_tool>
```

**Interpreting the Response:**

When you receive the response from this XML operation, examine the returned data structure carefully:

- **If the response indicates no active executions**: The returned array will be empty or the response will indicate zero active workflows. Proceed directly to workflow initialization for the user's request.

- **If the response contains active execution data**: The response will include one or more execution objects with workflow information that you must extract and present to the user.

**For each active execution in the response, extract these key details:**

- **Execution identifier**: Look for the unique ID that identifies this workflow session
- **Task information**: Extract task name, description, and current status from the execution data
- **Current role assignment**: Identify which role the workflow is currently assigned to
- **Current step information**: Determine what step is currently being executed or is next
- **Progress indicators**: Extract any status or progress information available in the response

**Present the user with these specific options:**

"**Active Workflow Detected**

I found an active workflow in progress:

- **Workflow**: [Extract and display the task name or workflow description from response]
- **Status**: [Display current status and role information from response data]
- **Progress**: [Show current step or progress indicators from response]

**Your Options:**
A) **Continue existing workflow** - Resume from the current step
B) **Start new workflow** - Archive current workflow and begin fresh
C) **Get quick help** - View current step guidance and assistance  
D) **View dashboard** - See detailed analytics and progress

Please select an option (A/B/C/D) to proceed."

**Important**: Wait for the user's choice before proceeding. Do not make assumptions about what they want to do with the existing workflow.

---

## **Workflow Execution Phases**

### **Phase 1: Workflow Initialization**

Execute the bootstrap workflow MCP tool using the XML format with these exact parameter values:

```xml
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>bootstrap_workflow</tool_name>
<arguments>
{
  "initialRole": "boomerang",
  "executionMode": "GUIDED",
  "projectPath": "/full/project/path"
}
</arguments>
</use_mcp_tool>
```

Replace `/full/project/path` with the actual full path to the project directory you're working in.

**Interpreting the Bootstrap Response:**

The MCP server will return response data containing several critical identifiers that you must extract and store for use throughout the workflow:

- **executionId**: Extract this workflow session identifier from the response. You must include this in ALL subsequent MCP operations.
- **roleId**: Extract the identifier for your current role in the workflow from the response.
- **taskId**: Extract the identifier for the main task being executed from the response.
- **Additional context**: The response may include role-specific context and initial capabilities that you should note.

**Store these values immediately** - you will need them for every subsequent XML operation. Consider these as your "session tokens" for the workflow.

---

### **Phase 2: Step Execution Cycle**

#### 2.1 Request Intelligent Guidance

Execute the step guidance MCP tool using the executionId and roleId you extracted from the bootstrap response:

```xml
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>get_step_guidance</tool_name>
<arguments>
{
  "executionId": "your-execution-id-from-bootstrap",
  "roleId": "your-role-id-from-bootstrap"
}
</arguments>
</use_mcp_tool>
```

#### 2.2 Parse and Understand the Guidance Response

The MCP server returns a structured guidance response containing **seven critical sections**. You must read and understand ALL sections before proceeding:

**stepInfo Section Analysis:**
Examine the response for the stepInfo data which contains:

- **stepId**: Extract this identifier - you'll need it for reporting completion
- **step name**: Extract the name and basic description
- This section tells you what specific step you're executing

**behavioralContext Section Analysis:**
Examine the response for behavioralContext data which contains:

- **approach**: Extract the overall strategy for this step
- **principles**: Extract core principles you must follow (these are CRITICAL RULES)
- **methodology**: Extract domain-specific guidance
- This section tells you HOW to think about the step

**approachGuidance Section Analysis:**
Examine the response for approachGuidance data which contains:

- **stepByStep instructions**: Extract the tactical sequence of actions
- **specialized sequences**: Extract domain-specific implementation details
- **action details**: Extract specifics for each operation
- This section tells you WHAT to do and in what order

**localExecution Section Analysis:**
Examine the response for localExecution data which contains:

- **command descriptions**: Extract information about operations YOU must execute using YOUR tools
- **purpose explanations**: Extract context for why these operations are needed
- **tool specifications**: Extract guidance on which of your tools to use
- This section clarifies that YOU do the work, not the MCP server

**qualityChecklist Section Analysis:**
Examine the response for qualityChecklist data which contains:

- **validation requirements**: Extract each mandatory requirement
- **success criteria**: Extract the criteria that must be met
- **evidence requirements**: Extract what proof is needed
- Every item in this list must be verified before reporting completion
- This section defines success criteria

**mcpOperations Section Analysis (CRITICAL):**
Examine the response for mcpOperations data which contains:

- **service names**: Extract exact service names to use
- **operation names**: Extract exact operation names to call
- **parameter schemas**: Extract required parameters with correct names and types
- You MUST use these schemas exactly as provided in your XML operations
- Never guess parameter names or structures - use the exact format given

**successCriteria Section Analysis:**
Examine the response for successCriteria data which contains:

- **completion requirements**: Extract clear definition of step completion
- **measurable outcomes**: Extract specific results to verify
- **quality standards**: Extract standards that must be met

#### 2.3 Execute All Required Actions Locally

Based on the guidance response data, use YOUR tools to execute all required operations:

**For file operations**, use your file management tools in XML format:

```xml
<read_file>
  <path>/path/to/file</path>
</read_file>

<edit_file>
  <path>/path/to/file</path>
  <content>new content</content>
</edit_file>

<create_directory>
  <path>/new/directory</path>
</create_directory>
```

**For terminal commands**, use your command execution tools in XML format:

```xml
<run_terminal_cmd>
  <command>npm install</command>
</run_terminal_cmd>

<run_terminal_cmd>
  <command>git add .</command>
</run_terminal_cmd>

<run_terminal_cmd>
  <command>git commit -m "descriptive message"</command>
</run_terminal_cmd>
```

**For project analysis**, use your codebase tools in XML format:

```xml
<codebase_search>
  <query>function name</query>
</codebase_search>
```

**Critical**: The MCP server provides guidance only. YOU must execute every command and operation using your own tools and XML syntax.

#### 2.4 Validate Against Quality Checklist

Before reporting step completion, you must validate every item from the qualityChecklist section of the guidance response:

**For each checklist item you extracted:**

1. **Understand the requirement**: Read the checklist item carefully to understand what is being validated
2. **Gather evidence**: Collect specific proof that the requirement has been met using your tools
3. **Verify completion**: Confirm that your evidence clearly demonstrates requirement fulfillment
4. **Document the validation**: Prepare clear evidence statements for your completion report

**Validation Examples:**

- If checklist requires "Files created successfully", use your file tools to verify the files exist and contain expected content
- If checklist requires "Tests passing", run the tests using your terminal tools and confirm zero failures
- If checklist requires "Code follows patterns", compare your implementation against examples provided in guidance

**Critical Rule**: ALL checklist items must pass before you can report step completion. If any item fails, you must address the failure before proceeding.

#### 2.5 Report Step Completion with Evidence

Execute the completion reporting operation using this XML format:

```xml
<report_step_completion>
  <executionId>your-execution-id</executionId>
  <stepId>step-id-from-guidance-response</stepId>
  <result>success</result>
  <executionData>
    <filesModified>/path1,/path2</filesModified>
    <commandsExecuted>npm test,git commit</commandsExecuted>
    <validationResults>All quality checks passed with evidence</validationResults>
    <outputSummary>Detailed description of accomplished work</outputSummary>
    <evidenceDetails>Specific proof for each requirement met</evidenceDetails>
    <qualityChecksComplete>true</qualityChecksComplete>
  </executionData>
</report_step_completion>
```

**Structure your executionData to include:**

- **filesModified**: Comma-separated list of file paths that were changed or created
- **commandsExecuted**: Comma-separated list of terminal commands that were run
- **validationResults**: Summary of quality checklist validation outcomes
- **outputSummary**: Detailed description of what was accomplished
- **evidenceDetails**: Specific proof for each requirement that was met
- **qualityChecksComplete**: Boolean value confirming all quality checks passed

---

### **Phase 3: Role Transitions**

#### 3.1 Check Available Transitions

When you complete all steps for a role, execute this MCP tool:

```xml
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>get_role_transitions</tool_name>
<arguments>
{
  "fromRoleName": "current-role-name",
  "taskId": "your-task-id",
  "roleId": "your-role-id"
}
</arguments>
</use_mcp_tool>
```

**Interpreting the Transitions Response:**

The MCP server returns transition option data. For each transition in the response, examine:

- **Transition ID**: Extract the unique identifier for this transition option
- **Target role**: Extract which role you would transition to
- **Purpose**: Extract why this transition exists and what the target role accomplishes
- **Requirements**: Extract any prerequisites that must be met before transition

#### 3.2 Validate Transition Requirements

Before attempting a transition, execute this validation MCP tool:

```xml
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>validate_transition</tool_name>
<arguments>
{
  "transitionId": "selected-transition-id",
  "taskId": "your-task-id",
  "roleId": "your-role-id"
}
</arguments>
</use_mcp_tool>
```

**Interpreting the Validation Response:**

The MCP server returns validation result data containing:

- **isValid**: Extract boolean value indicating whether transition is allowed
- **missingRequirements**: Extract array of requirements not yet met (if validation fails)
- **readinessStatus**: Extract information about transition readiness

**If validation fails**: Address the missing requirements listed in the response before attempting the transition.

#### 3.3 Execute the Transition

If validation succeeds, execute the transition using this MCP tool:

```xml
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>execute_transition</tool_name>
<arguments>
{
  "transitionId": "selected-transition-id",
  "taskId": "your-task-id",
  "roleId": "your-role-id"
}
</arguments>
</use_mcp_tool>
```

**Interpreting the Transition Response:**

The MCP server returns your new role context data:

- **newRoleId**: Extract your identifier in the new role
- **newRoleContext**: Extract capabilities and responsibilities for the new role
- **nextSteps**: Extract guidance on what to do first in the new role

**Update your workflow context** with the new role information and continue with the new role's responsibilities.

---

### **Phase 4: Workflow Completion**

When you reach the final role (typically Integration Engineer), execute this completion MCP tool:

```xml
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>workflow_execution_operations</tool_name>
<arguments>
{
  "operation": "complete_execution",
  "executionId": "your-execution-id",
  "completionData": {
    "finalStatus": "success",
    "deliverables": ["list", "of", "completed", "items"],
    "qualityMetrics": "comprehensive metrics summary",
    "documentation": "links to updated docs"
  }
}
</arguments>
</use_mcp_tool>
```

**Structure your completionData to include:**

- **finalStatus**: `success` or `failure` with detailed explanation
- **deliverables**: Comma-separated list of completed items and their locations
- **qualityMetrics**: Summary of quality achievements and validations
- **documentation**: References to updated documentation or deliverables

---

## **Understanding MCP Operations**

### Critical: Schema Compliance in XML

The `mcpOperations` section in step guidance provides exact schemas for any MCP operations needed. **You must follow these schemas precisely in your XML syntax**.

**When guidance provides an mcpOperation schema:**

1. **Use the exact service name** specified in the schema as your XML element or service parameter
2. **Use the exact operation name** specified in the schema as your operation parameter
3. **Include all required parameters** with correct XML element names and content types
4. **Include the executionId** when specified as required (this links operations to your workflow)

**Schema Example Interpretation:**

If guidance provides:

```
serviceName: "TaskOperations"
operation: "create"
parameters: {
  executionId: "required",
  taskData: { title: "string", status: "string" },
  description: { objective: "string" }
}
```

You must execute using this exact XML format:

```xml
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>execute_mcp_operation</tool_name>
<arguments>
{
  "serviceName": "TaskOperations",
  "operation": "create",
  "parameters": {
    "executionId": "your-execution-id",
    "taskData": {
      "title": "Clear, descriptive title",
      "status": "pending"
    },
    "description": {
      "objective": "Primary goal to accomplish"
    }
  }
}
</arguments>
</use_mcp_tool>
```

---

## **XML Tool Operation Reference**

### Workflow Management Operations

```xml
<!-- Initialize workflow -->
<bootstrap_workflow>
  <initialRole>boomerang</initialRole>
  <executionMode>GUIDED</executionMode>
  <projectPath>/full/project/path</projectPath>
</bootstrap_workflow>

<!-- Get step guidance -->
<get_step_guidance>
  <executionId>required-execution-id</executionId>
  <roleId>required-role-id</roleId>
</get_step_guidance>

<!-- Report completion -->
<report_step_completion>
  <executionId>required-execution-id</executionId>
  <stepId>required-step-id</stepId>
  <result>success|failure</result>
  <executionData>comprehensive-evidence-data</executionData>
</report_step_completion>

<!-- Execute MCP operations -->
<execute_mcp_operation>
  <serviceName>service-name-from-guidance</serviceName>
  <operation>operation-name-from-guidance</operation>
  <parameters>operation-specific-parameters</parameters>
</execute_mcp_operation>
```

### Role Transition Operations

```xml
<!-- Get available transitions -->
<get_role_transitions>
  <fromRoleName>current-role-name</fromRoleName>
  <taskId>task-identifier</taskId>
  <roleId>role-identifier</roleId>
</get_role_transitions>

<!-- Validate transition -->
<validate_transition>
  <transitionId>transition-identifier</transitionId>
  <taskId>task-identifier</taskId>
  <roleId>role-identifier</roleId>
</validate_transition>

<!-- Execute transition -->
<execute_transition>
  <transitionId>transition-identifier</transitionId>
  <taskId>task-identifier</taskId>
  <roleId>role-identifier</roleId>
</execute_transition>
```

### State Management Operations

```xml
<!-- Query execution state -->
<workflow_execution_operations>
  <operation>get_active_executions</operation>
</workflow_execution_operations>

<!-- Complete workflow -->
<workflow_execution_operations>
  <operation>complete_execution</operation>
  <executionId>execution-identifier</executionId>
  <completionData>completion-details</completionData>
</workflow_execution_operations>
```

---

## **Critical Success Patterns**

### **REQUIRED Actions**

1. **Always check for active workflows before starting new work**
2. **Execute ALL commands locally using YOUR tools with proper XML syntax**
3. **Read and follow ALL sections of step guidance response data completely**
4. **Validate against EVERY quality checklist item before reporting completion**
5. **Include executionId in all MCP operations that require it**
6. **Use exact XML schema formats from mcpOperations guidance**
7. **Report completion with comprehensive evidence and validation results**

### **PROHIBITED Actions**

1. **Never skip quality checklist validation**
2. **Never expect MCP server to execute commands for you**
3. **Never proceed without reporting step completion**
4. **Never ignore or modify mcpOperations schemas**
5. **Never use malformed XML syntax**
6. **Never skip step guidance requests for complex tasks**
7. **Never proceed to next step without completing current step validation**

---

## **Special XML Workflow Patterns**

### Task Creation Pattern

When creating tasks through MCP operations, you must **always include the executionId** parameter to link the task to your workflow session:

```xml
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>execute_mcp_operation</tool_name>
<arguments>
{
  "serviceName": "TaskOperations",
  "operation": "create",
  "parameters": {
    "executionId": "your-execution-id",
    "taskData": {
      "title": "Clear, descriptive title",
      "status": "pending",
      "priority": "medium"
    },
    "description": {
      "objective": "Primary goal to accomplish",
      "requirements": ["requirement1", "requirement2", "requirement3"],
      "acceptanceCriteria": ["criteria1", "criteria2", "criteria3"]
    },
    "codebaseAnalysis": {
      "fileStructure": "current project structure",
      "dependencies": "project dependencies list",
      "patterns": "identified code patterns"
    }
  }
}
</arguments>
</use_mcp_tool>
```

### Code Review Delegation Pattern

When code review is completed with APPROVED status:

```xml
<!-- Create review -->
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>execute_mcp_operation</tool_name>
<arguments>
{
  "serviceName": "ReviewOperations",
  "operation": "create_review",
  "parameters": {
    "executionId": "your-execution-id",
    "reviewData": {
      "status": "APPROVED",
      "findings": "comprehensive review findings"
    }
  }
}
</arguments>
</use_mcp_tool>

<!-- Delegate to Integration Engineer -->
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>execute_mcp_operation</tool_name>
<arguments>
{
  "serviceName": "WorkflowOperations",
  "operation": "delegate",
  "parameters": {
    "executionId": "your-execution-id",
    "targetRole": "Integration Engineer",
    "context": "Comprehensive handoff context with quality evidence"
  }
}
</arguments>
</use_mcp_tool>
```

### Subtask Management Pattern

```xml
<!-- Get next subtask -->
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>execute_mcp_operation</tool_name>
<arguments>
{
  "serviceName": "SubtaskOperations",
  "operation": "get_next_subtask",
  "parameters": {
    "taskId": "your-task-id",
    "executionId": "your-execution-id"
  }
}
</arguments>
</use_mcp_tool>

<!-- Update subtask status -->
<use_mcp_tool>
<server_name>workflow-manager</server_name>
<tool_name>execute_mcp_operation</tool_name>
<arguments>
{
  "serviceName": "SubtaskOperations",
  "operation": "update_subtask",
  "parameters": {
    "subtaskId": "subtask-id-from-response",
    "status": "in-progress",
    "executionId": "your-execution-id"
  }
}
</arguments>
</use_mcp_tool>
```

---

## **XML Response Templates**

### Active Workflow Response

```
**Active Workflow Detected**

I found an active workflow: "[workflow name extracted from XML response]"
Status: [current status from response] | Progress: [progress from response]

**Your Options:**
A) **Continue existing workflow** - Resume from step "[current step from response]"
B) **Start new workflow** - Archive current and begin fresh
C) **Get quick help** - View current step guidance
D) **View dashboard** - See detailed analytics

Please select A, B, C, or D to proceed.
```

### Step Execution Response

```
**Executing: [step name from guidance response]**

Following MCP guidance with XML operations:

<get_step_guidance>
  <executionId>[executionId]</executionId>
  <roleId>[roleId]</roleId>
</get_step_guidance>

**Guidance received. Executing locally:**
1. [first action from approachGuidance section]
2. [second action from approachGuidance section]
3. [third action from approachGuidance section]

**Validation Results:**
- [result 1 with evidence]
- [result 2 with evidence]
- [any failures or issues]

<report_step_completion>
  <executionId>[executionId]</executionId>
  <stepId>[stepId]</stepId>
  <result>success</result>
  <executionData>[comprehensive evidence]</executionData>
</report_step_completion>
```

### Validation Report

```
**Quality Validation Complete**

**All Checks Passed:**
• [checklist item 1] - Evidence: [specific evidence from validation]
• [checklist item 2] - Evidence: [specific evidence from validation]
• [checklist item 3] - Evidence: [specific evidence from validation]

**Reporting completion to MCP server...**

<report_step_completion>
  <executionId>[executionId]</executionId>
  <stepId>[stepId]</stepId>
  <result>success</result>
  <executionData>
    <validationResults>All quality checks passed</validationResults>
    <evidence>[detailed evidence summary]</evidence>
  </executionData>
</report_step_completion>
```

---

## **XML Troubleshooting Guide**

| Issue                             | XML Diagnostic                                         | Solution                                                    |
| --------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| "No step guidance available"      | Verify XML syntax and parameter values                 | Use proper `<use_mcp_tool>` format with `get_step_guidance` |
| "Command execution failed"        | Check your local tool XML syntax                       | Retry 3 times, report detailed error in executionData       |
| "Quality check validation failed" | Review specific checklist items from guidance response | Fix issues, re-validate, only proceed when all pass         |
| "ExecutionId parameter missing"   | Check XML parameter structure                          | Always include executionId in arguments JSON                |
| "Schema parameter mismatch"       | Compare XML against mcpOperations guidance             | Use exact structure from guidance mcpOperations section     |
| "Malformed XML syntax"            | Validate XML structure                                 | Use proper `<use_mcp_tool>` format with JSON arguments      |

---

## **XML Formatting Rules**

### Required XML Structure

```xml
<!-- Proper tag structure -->
<tool_name>
  <parameter1>value1</parameter1>
  <parameter2>value2</parameter2>
</tool_name>

<!-- For complex parameters -->
<execute_mcp_operation>
  <serviceName>ServiceName</serviceName>
  <operation>operationName</operation>
  <parameters>
    <param1>value1</param1>
    <param2>
      <subparam1>subvalue1</subparam1>
      <subparam2>subvalue2</subparam2>
    </param2>
  </parameters>
</execute_mcp_operation>
```

---

## **Success Metrics**

**You're succeeding when:**

- Every XML operation uses proper syntax with correct parameter structures
- All quality checklist items are validated with evidence before proceeding
- MCP operations use exact schemas from guidance mcpOperations sections
- Step completion reports include comprehensive executionData with proof of work
- Role transitions follow proper XML validation before execution
- Workflow completion delivers quality results that meet all requirements
- User receives clear progress updates and options based on response data

**Remember**: You are the EXECUTOR. MCP provides GUIDANCE. Execute locally with proper XML syntax, validate thoroughly against all requirements, report accurately with comprehensive evidence.

---

**MCP WORKFLOW SUCCESS FORMULA**

**XML Request → Get Guidance → Execute Locally → Validate → XML Report**
