export function checkOnEmptyInput({input}) {
  if (input.value === '') 
    return 'Поле не должно быть пустым!';
  return null;
}

export function hasRepositoryAutocompleteItems({input, autocompleteItems}) {
  if (autocompleteItems.length === 0) 
    return 'Нет подходящих репозиториев!';
  return null;
}
