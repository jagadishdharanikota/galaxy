import path from 'path';

function getTestDependencyRelativePath(fileName) {
  const projectDirName = path.basename(process.cwd());
  const currentFileRelativePath = path.relative(projectDirName, fileName);
  const filePath = currentFileRelativePath.replace('.test', '').replace('test', 'src');
  return filePath;
}

async function loadModuleAsync(path) {
  const module = await import(path);
  return module.default;
}

export { getTestDependencyRelativePath, loadModuleAsync };
