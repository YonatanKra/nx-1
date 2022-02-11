import { CypressComponentProjectSchema } from './schema';
import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  joinPathFragments,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { join } from 'path';
import {
  cypressReactVersion,
  cypressWebpackVersion,
} from '../../utils/versions';

export async function cypressComponentProject(
  tree: Tree,
  options: CypressComponentProjectSchema
) {
  // TODO: normalize options

  // TODO verify cypress >10 is installed, if no cypress version install cypressVersion

  const projectConfig = readProjectConfiguration(tree, options.project);
  generateFiles(tree, join(__dirname, 'files'), projectConfig.root, {
    ...options,
    projectRoot: projectConfig.root,
    offsetFromRoot: offsetFromRoot(projectConfig.root),
    ext: '',
  });

  // add target to project

  projectConfig.targets['test-cmp'] = {
    executor: '@nrwl/cypress:cypress',
    options: {
      cypressConfig: joinPathFragments(projectConfig.root, 'cypress.config.ts'),
      testingType: 'component',
    },
  };

  updateProjectConfiguration(tree, options.project, projectConfig);

  const installDeps = addDependenciesToPackageJson(
    tree,
    {},
    {
      '@cypress/react': cypressReactVersion,
      '@cypress/webpack-dev-server': cypressWebpackVersion,
      'html-webpack-plugin': '^4.0.0',
    }
  );

  return () => {
    formatFiles(tree);
    installDeps?.();
  };
}
