# Comprehensive MCP Schema vs Prisma Database Alignment Audit

## Executive Summary

This document provides a comprehensive audit of ALL 29 MCP tool Zod schemas across 6 domains against the 14 Prisma database models. The previous audit only covered the CRUD domain (4 schemas), missing 25 critical schemas.

## Schema Inventory

### MCP Tool Schemas by Domain (29 total)
1. **CRUD Domain (4 schemas)**
   - create-task.schema.ts ✅ FIXED
   - delete-task.schema.ts
   - search-tasks.schema.ts 
   - update-task-description.schema.ts ✅ FIXED

2. **INTERACTION Domain (3 schemas)**
   - add-task-note.schema.ts
   - process-command.schema.ts
   - shorthand-command.schema.ts

3. **PLAN Domain (6 schemas)**
   - add-subtask-to-batch.schema.ts
   - batch.schema.ts
   - check-batch-status.schema.ts
   - implementation-plan.schema.ts
   - subtask.schema.ts
   - update-subtask-status.schema.ts

4. **QUERY Domain (9 schemas)**
   - continue-task.schema.ts
   - get-context-diff.schema.ts
   - get-current-mode-for-task.schema.ts
   - get-task-context.schema.ts
   - get-task-status.schema.ts
   - list-tasks.schema.ts
   - task-dashboard.schema.ts
   - workflow-map.schema.ts
   - workflow-status.schema.ts

5. **REPORTING Domain (3 schemas)**
   - code-review-report.schema.ts
   - completion-report.schema.ts
   - research-report.schema.ts

6. **STATE Domain (4 schemas)**
   - complete-task.schema.ts
   - delegate-task.schema.ts
   - role-transition.schema.ts
   - update-task-status.schema.ts

### Prisma Database Models (14 total)
1. Task
2. TaskDescription
3. ImplementationPlan
4. Subtask
5. DelegationRecord
6. ResearchReport
7. CodeReview
8. CompletionReport
9. MemoryBank
10. Commit
11. Comment
12. WorkflowTransition
13. Template
14. SchemaVersion

## Critical Alignment Issues Found

### 1. INTERACTION Domain Issues

#### add-task-note.schema.ts vs Comment Model
**MISALIGNMENT**: Field name and type mismatch
- Schema: `subtaskId: z.number().int().optional()` (Prisma numeric ID)
- Database: `subtaskId Int?` ✅ ALIGNED
- **ISSUE**: Schema validates correctly but missing relationship handling

#### Schema Missing Fields:
- Missing `id` field (Comment.id: Int @id @default(autoincrement()))
- Missing `createdAt` field (Comment.createdAt: DateTime @default(now()))

### 2. PLAN Domain Issues

#### subtask.schema.ts vs Subtask Model
**MAJOR MISALIGNMENTS**:

1. **ID Field Type Mismatch**:
   - Schema: `id: z.string()` (expects string like "ST-001")
   - Database: `id Int @id @default(autoincrement())` (numeric autoincrement)
   - **CRITICAL**: This breaks all subtask operations

2. **Missing Database Fields in Schema**:
   - `planId Int` (required FK to ImplementationPlan)
   - `estimatedDuration String?` 
   - `startedAt DateTime?`
   - `completedAt DateTime?`

3. **Schema Fields Not in Database**:
   - `estimatedHours: z.number().optional()` (vs estimatedDuration String?)
   - `actualHours: z.number().optional()` (not in DB)
   - `acceptanceCriteria: z.array(z.string())` (not in DB)
   - `relatedDocs: z.array(DocumentRefSchema)` (not in DB)
   - `notes: z.array(z.string())` (not in DB) 
   - `dependencies: z.array(z.string())` (not in DB)
   - `_batchInfo: BatchInfoSchema` (not in DB)

4. **Field Type Mismatches**:
   - Schema: `assignedTo: RoleCodeSchema` (enum)
   - Database: `assignedTo String?` (free text)

#### implementation-plan.schema.ts vs ImplementationPlan Model
**MISALIGNMENTS**:

1. **Missing Database Fields**:
   - `id Int @id @default(autoincrement())` (required)
   - `createdAt DateTime @default(now())`
   - `updatedAt DateTime @updatedAt`

2. **Field Type Mismatches**:
   - Schema: `filesToModify: z.array(z.string())`
   - Database: `filesToModify Json` ✅ ALIGNED (JSON arrays work)

#### batch.schema.ts - NO DATABASE MODEL
**CRITICAL**: Batch is a logical grouping but has no dedicated table. Stored as:
- `batchId String?` in Subtask table
- `batchTitle String?` in Subtask table

### 3. REPORTING Domain Issues

#### code-review-report.schema.ts vs CodeReview Model
**MAJOR MISALIGNMENTS**:

1. **Field Name Differences**:
   - Schema: `taskId: z.string().uuid()` (expects UUID)
   - Database: `taskId String` (any string, no UUID constraint)

2. **Missing Database Fields in Schema**:
   - `id Int @id @default(autoincrement())`
   - `strengths String`
   - `issues String` 
   - `acceptanceCriteriaVerification Json`
   - `manualTestingResults String`
   - `requiredChanges String?`
   - `createdAt DateTime`
   - `updatedAt DateTime`

3. **Schema Fields Not in Database**:
   - `findings: z.array(CodeReviewFindingSchema)` (complex nested structure)
   - Schema expects structured findings, DB has flat text fields

#### completion-report.schema.ts vs CompletionReport Model
**MISALIGNMENTS**:

1. **ID Type Mismatch**:
   - Schema expects `taskId: z.string().uuid()` (UUID constraint)
   - Database: `taskId String` (no UUID constraint)

2. **Missing Database Field**:
   - Database: `id Int @id @default(autoincrement())` (missing from schema)

#### research-report.schema.ts vs ResearchReport Model
**MOSTLY ALIGNED** ✅ - This schema appears well-designed

### 4. STATE Domain Issues

#### delegate-task.schema.ts vs DelegationRecord Model
**MISALIGNMENTS**:

1. **Missing Database Fields in Schema**:
   - `id Int @id @default(autoincrement())`
   - `delegationTimestamp DateTime @default(now())`
   - `completionTimestamp DateTime?`
   - `success Boolean?`
   - `rejectionReason String?`
   - `redelegationCount Int @default(0)`

2. **Field Name Differences**:
   - Schema: `fromMode/toMode` (processed through TOKEN_MAPS)
   - Database: `fromMode/toMode String` ✅ COMPATIBLE

### 5. QUERY Domain Issues

#### search-tasks.schema.ts vs Task Model
**MISALIGNMENTS**:

1. **Status/Mode Value Mapping**:
   - Schema allows shorthand (INP, COM) and full names
   - Database stores full names ("In Progress", "Completed")
   - TOKEN_MAPS handle conversion, but inconsistent usage

2. **Missing Advanced Search Fields**:
   - No search on `priority String?`
   - No search on `dependencies Json?`
   - No search on `creationDate/completionDate` ranges

## Tables/Models with NO Corresponding Schemas

1. **MemoryBank** - No MCP operations for memory bank management
2. **Commit** - No MCP operations for Git commit tracking  
3. **WorkflowTransition** - No direct MCP schema (handled by state operations)
4. **Template** - No MCP operations for template management
5. **SchemaVersion** - No MCP operations for schema versioning

## Priority Issues to Fix

### P0 - Critical (Breaks Core Functionality)
1. **Subtask ID type mismatch** (string vs int autoincrement)
2. **Missing planId in subtask operations** (breaks FK constraints)
3. **Batch operations without proper database mapping**

### P1 - High (Data Integrity Issues)
1. **Missing autoincrement IDs** in reporting schemas
2. **CodeReview findings structure mismatch** (nested vs flat)
3. **Missing required timestamps** (createdAt, updatedAt)

### P2 - Medium (Validation & Consistency)
1. **UUID constraints** not enforced in database
2. **Status/mode value inconsistencies** across domains
3. **Missing optional database fields** in schemas

### P3 - Low (Enhancement Opportunities)
1. **Missing MCP operations** for MemoryBank, Template management
2. **Advanced search capabilities** not exposed via schemas
3. **Git commit tracking** not accessible via MCP

## Recommended Fix Strategy

### Phase 1: Core Data Model Alignment
1. Fix Subtask schema ID handling (use Prisma numeric ID, add string reference)
2. Add missing planId to subtask operations
3. Redesign batch operations to work with database structure

### Phase 2: Reporting Schema Fixes
1. Align CodeReview schema with database fields
2. Fix ID type mismatches in reporting schemas
3. Add missing timestamp fields

### Phase 3: Validation & Consistency
1. Standardize status/mode value handling across all domains
2. Add UUID validation where appropriate
3. Complete missing optional field mappings

### Phase 4: Feature Completion
1. Add MCP operations for missing models (MemoryBank, Template)
2. Enhance search capabilities
3. Add Git commit tracking via MCP

## Testing Strategy

1. **Unit Tests**: Verify each schema validates against sample database data
2. **Integration Tests**: Test complete CRUD operations for each domain
3. **End-to-End Tests**: Verify full workflow with all schema-database interactions
4. **Data Migration Tests**: Ensure existing data compatible with schema changes

## Success Criteria

- [ ] All 29 schemas align with corresponding database fields
- [ ] No missing required fields in any schema
- [ ] All field types match between schemas and database
- [ ] Proper validation rules for all operations
- [ ] Clear error messages for AI agents
- [ ] All tests pass with updated schemas
- [ ] Database operations work correctly with aligned schemas