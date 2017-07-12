import {toJS} from 'mobx';

export function checkOnFirstStartup({userInput, repositoryInput}) {
  if (userInput.errors === null || repositoryInput.errors === null) 
    return true;
  return false;
}

export function inputsNoError({userInput, repositoryInput}) {
  const userErrors = toJS(userInput.errors);
  const repositoryErrors = toJS(repositoryInput.errors);
  if (userErrors.length === 0 && repositoryErrors.length === 0) 
    return false;
  return true;
}
