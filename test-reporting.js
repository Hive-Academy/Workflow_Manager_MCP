const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function testReportingSystem() {
  console.log('🚀 Testing MCP Reporting System...\n');

  try {
    // 1. Create sample data
    console.log('📊 Creating sample data...');

    const task1 = await prisma.task.create({
      data: {
        taskId: 'TSK-001',
        name: 'Implement User Authentication',
        status: 'Completed',
        owner: 'john.doe',
        currentMode: 'boomerang',
        priority: 'High',
        completionDate: new Date(),
        taskDescription: {
          create: {
            description: 'Implement JWT-based user authentication system',
            businessRequirements: 'Users need secure login functionality',
            technicalRequirements:
              'JWT tokens, password hashing, session management',
            acceptanceCriteria: [
              'Login works',
              'Logout works',
              'Password reset works',
            ],
          },
        },
      },
    });

    const task2 = await prisma.task.create({
      data: {
        taskId: 'TSK-002',
        name: 'Create User Dashboard',
        status: 'In Progress',
        owner: 'jane.smith',
        currentMode: 'senior-developer',
        priority: 'Medium',
        taskDescription: {
          create: {
            description: 'Create responsive user dashboard with analytics',
            businessRequirements: 'Users need to see their data',
            technicalRequirements:
              'React components, charts, responsive design',
            acceptanceCriteria: [
              'Dashboard loads',
              'Charts display',
              'Mobile responsive',
            ],
          },
        },
      },
    });

    // Create delegation records
    await prisma.delegationRecord.create({
      data: {
        taskId: 'TSK-001',
        fromMode: 'boomerang',
        toMode: 'architect',
        success: true,
      },
    });

    await prisma.delegationRecord.create({
      data: {
        taskId: 'TSK-002',
        fromMode: 'architect',
        toMode: 'senior-developer',
        success: true,
      },
    });

    // Create code review
    await prisma.codeReview.create({
      data: {
        taskId: 'TSK-001',
        status: 'APPROVED',
        summary: 'Code meets all requirements',
        strengths: 'Clean code, good test coverage',
        issues: 'Minor formatting issues',
        acceptanceCriteriaVerification: ['All criteria met'],
        manualTestingResults: 'All tests passed',
      },
    });

    console.log('✅ Sample data created successfully!\n');

    // 2. Test database queries
    console.log('🔍 Testing database queries...');

    const taskCount = await prisma.task.count();
    const delegationCount = await prisma.delegationRecord.count();
    const reviewCount = await prisma.codeReview.count();

    console.log(`- Tasks: ${taskCount}`);
    console.log(`- Delegations: ${delegationCount}`);
    console.log(`- Code Reviews: ${reviewCount}`);
    console.log('✅ Database queries working!\n');

    // 3. Test basic metrics calculation
    console.log('📈 Testing metrics calculation...');

    const completedTasks = await prisma.task.count({
      where: { status: 'Completed' },
    });
    const completionRate =
      taskCount > 0 ? (completedTasks / taskCount) * 100 : 0;

    console.log(`- Completion Rate: ${completionRate.toFixed(1)}%`);
    console.log('✅ Metrics calculation working!\n');

    console.log(
      '🎉 All tests passed! The reporting system is ready for MCP testing.',
    );
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testReportingSystem();
