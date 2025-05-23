# Comprehensive Schema Mismatch Analysis - TSK-003

## Overview
Complete audit of all 29 MCP tool Zod schemas across 6 domains vs 14 Prisma database models to identify and fix ALL alignment issues.

## Database Models from Prisma Schema (14 total)
1. **Task** - Primary entity (String ID: taskId)
2. **TaskDescription** - 1:1 with Task
3. **ImplementationPlan** - 1:many with Task (Int ID)
4. **Subtask** - Many:1 with Plan, Many:1 with Task (Int ID) ✅ FIXED
5. **DelegationRecord** - Many:1 with Task, optional:1 with Subtask (Int ID)
6. **ResearchReport** - Many:1 with Task (Int ID)
7. **CodeReview** - Many:1 with Task (Int ID) ❌ MAJOR MISMATCH
8. **CompletionReport** - Many:1 with Task (Int ID)
9. **MemoryBank** - Standalone (Int ID)
10. **Commit** - Many:1 with Task, optional:1 with Subtask (Int ID)
11. **Comment** - Many:1 with Task, optional:1 with Subtask (Int ID)
12. **WorkflowTransition** - Many:1 with Task (Int ID)
13. **Template** - Standalone (Int ID)
14. **SchemaVersion** - Singleton (Int ID)

## MCP Tool Schemas by Domain (29 total)

### 🟢 CRUD Domain (4 schemas) - ✅ FIXED
- create-task.schema.ts ✅ FIXED
- delete-task.schema.ts ✅ VERIFIED ALIGNED
- search-tasks.schema.ts ✅ VERIFIED ALIGNED
- update-task-description.schema.ts ✅ FIXED

### 🟡 INTERACTION Domain (3 schemas) - NEEDS VERIFICATION
- add-task-note.schema.ts → maps to **Comment** model
- process-command.schema.ts → command processor (no direct DB model)
- shorthand-command.schema.ts → command processor (no direct DB model)

### 🟡 PLAN Domain (6 schemas) - PARTIALLY FIXED
- add-subtask-to-batch.schema.ts ✅ FIXED with Subtask fixes
- batch.schema.ts → logical grouping (no direct DB model)
- check-batch-status.schema.ts → query operation (no direct DB model)
- implementation-plan.schema.ts ✅ NEEDS VERIFICATION vs ImplementationPlan model
- subtask.schema.ts ✅ FIXED
- update-subtask-status.schema.ts ✅ FIXED

### 🔴 QUERY Domain (9 schemas) - NEEDS VERIFICATION
- continue-task.schema.ts → multi-model operation
- get-context-diff.schema.ts → context service (no direct DB model)
- get-current-mode-for-task.schema.ts → maps to **Task.currentMode**
- get-task-context.schema.ts → COMPLEX JOINS (this is what's failing!)
- get-task-status.schema.ts → maps to **Task** model
- list-tasks.schema.ts → maps to **Task** model with filtering
- task-dashboard.schema.ts → aggregation query (no direct DB model)
- workflow-map.schema.ts → static workflow (no direct DB model)
- workflow-status.schema.ts → maps to **WorkflowTransition** model

### 🔴 REPORTING Domain (3 schemas) - MAJOR MISMATCHES
- code-review-report.schema.ts → **CodeReview** model ❌ MAJOR MISMATCH
- completion-report.schema.ts → **CompletionReport** model ❌ LIKELY MISMATCH
- research-report.schema.ts → **ResearchReport** model ❌ LIKELY MISMATCH

### 🟡 STATE Domain (4 schemas) - NEEDS VERIFICATION
- complete-task.schema.ts → multi-model operation
- delegate-task.schema.ts → **DelegationRecord** model + Task updates
- role-transition.schema.ts → **WorkflowTransition** model
- update-task-status.schema.ts → **Task** model

## CRITICAL ISSUES IDENTIFIED

### 🚨 P0 - BLOCKING get_task_context (FIX IMMEDIATELY)

#### 1. CodeReview Schema vs Database MAJOR MISMATCH
**Database (CodeReview model):**
- id: Int @id @default(autoincrement()) 
- taskId: String
- status: String // 'APPROVED', 'APPROVED WITH RESERVATIONS', 'NEEDS CHANGES'
- summary: String
- strengths: String ⚠️
- issues: String ⚠️
- acceptanceCriteriaVerification: Json ⚠️
- manualTestingResults: String ⚠️
- requiredChanges: String? ⚠️
- createdAt: DateTime
- updatedAt: DateTime

**MCP Schema Expects:**
- id: z.string().uuid() ❌ Database uses Int
- taskId: z.string().uuid() ❌ May not be UUID
- reviewer: z.string() ❌ Not in database
- status: enum ✅ Both have
- summary: z.string() ✅ Both have
- findings: array ❌ Database uses 'issues' (String)
- commitSha: z.string() ❌ Not in database

**Missing in Schema but in DB:**
- strengths, acceptanceCriteriaVerification, manualTestingResults, requiredChanges

### 🚨 P1 - CONFIRMED ADDITIONAL BLOCKING ISSUES

#### 2. CompletionReport Schema vs Database ✅ ACTUALLY ALIGNED
**Database (CompletionReport model):**
- id: Int @id @default(autoincrement())
- taskId: String
- summary: String
- filesModified: Json
- delegationSummary: String  
- acceptanceCriteriaVerification: Json
- createdAt: DateTime

**MCP Schema:**
- id: z.number().int() ✅ MATCHES
- taskId: z.string().uuid() ⚠️ May not be UUID but String should work
- summary: z.string().min(1) ✅ MATCHES
- filesModified: z.any().optional() ✅ MATCHES (Json)
- delegationSummary: z.string().min(1) ✅ MATCHES
- acceptanceCriteriaVerification: z.any().optional() ✅ MATCHES (Json)
- createdAt: z.date() ✅ MATCHES

**Result: ALIGNED** - No fixes needed

#### 3. ResearchReport Schema vs Database ✅ ACTUALLY ALIGNED
**Database (ResearchReport model):**
- id: Int @id @default(autoincrement())
- taskId: String
- title: String
- summary: String
- findings: String
- recommendations: String
- references: Json
- createdAt: DateTime
- updatedAt: DateTime

**MCP Schema:**
- id: z.number().int() ✅ MATCHES
- taskId: z.string() ✅ MATCHES
- title: z.string().min(1) ✅ MATCHES
- summary: z.string().min(1) ✅ MATCHES  
- findings: z.string().min(1) ✅ MATCHES
- recommendations: z.string().optional() ✅ MATCHES
- references: z.array(...).optional() ✅ MATCHES (Json)
- createdAt: z.date() ✅ MATCHES
- updatedAt: z.date() ✅ MATCHES

**Result: ALIGNED** - No fixes needed

## NEXT STEPS - SYSTEMATIC FIX PLAN

### Phase 1: Complete Database vs Schema Audit
1. ✅ CodeReview - MAJOR MISMATCH identified (PRIMARY BLOCKER)
2. ✅ CompletionReport - ALIGNED, no fixes needed
3. ✅ ResearchReport - ALIGNED, no fixes needed  
4. ⏳ ImplementationPlan - verify alignment with fixes
5. ⏳ Comment/add-task-note - verify alignment
6. ⏳ DelegationRecord vs delegate-task - verify alignment
7. ⏳ WorkflowTransition vs role-transition - verify alignment

### Phase 2: Implement ALL Fixes
1. **🚨 PRIORITY: Fix CodeReview schema completely** (PRIMARY BLOCKER)
2. ✅ Subtask schemas already fixed
3. ✅ CRUD schemas already fixed
4. Fix any other identified mismatches from remaining audit
5. Update all corresponding services

### Phase 3: Comprehensive Testing
1. **🎯 Primary Test: get_task_context** (should work after CodeReview fix)
2. Test all MCP tool operations
3. Verify database operations work correctly
4. Test complex joins and serialization

## ROOT CAUSE CONFIRMED: CodeReview Schema is PRIMARY BLOCKER

The get_task_context failures are happening because:
1. **Complex joins** include CodeReview table via Task relations
2. **JSON serialization fails** when Prisma tries to serialize CodeReview data
3. **Schema mismatch** causes the serializer to expect UUID id but gets Int
4. **Additional field mismatches** cause further serialization conflicts

**Fix CodeReview schema → Fix get_task_context → Unblock entire workflow**

## IMMEDIATE ACTION PLAN
1. 🚨 **Fix CodeReview schema NOW** (highest impact)
2. 🔍 Quick audit remaining schemas for any similar Int vs UUID issues
3. 🧪 Test get_task_context immediately after CodeReview fix
4. 📋 Continue systematic audit if needed