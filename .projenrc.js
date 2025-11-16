const { awscdk } = require('projen');

const PROJECT_NAME = '@doceight/cdk-remote-stack';
const PROJECT_DESCRIPTION =
  'Get outputs and AWS SSM parameters from cross-region AWS CloudFormation stacks';
const AUTOMATION_TOKEN = 'AUTOMATION_GITHUB_TOKEN';

const project = new awscdk.AwsCdkConstructLibrary({
  authorName: 'Jimmy Holmes',
  name: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  repository: 'https://github.com/DocEight/cdk-remote-stack.git',
  keywords: ['aws', 'remote', 'cross-region', 'cross-stack', 'cross-account'],
  /**
   * we default release the main branch(cdkv2) with major version 2.
   */
  majorVersion: 2,
  defaultReleaseBranch: 'main',
  /**
   * we also release the cdkv1 branch with major version 1.
   */
  // releaseBranches: {
  //   cdkv1: { npmDistTag: 'cdkv1', majorVersion: 1 },
  // },
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['DocEight', 'cdk-automation'],
  },
  defaultReleaseBranch: 'main',
  cdkVersion: '2.224.0',
  python: {
    trustedPublishing: true,
    distName: 'dr8-cdk-remote-stack',
    module: 'dr8_cdk_remote_stack',
  },
  npmTrustedPublishing: true,
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
