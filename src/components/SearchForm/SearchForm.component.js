// Develop dependencies
import React from 'react';
import {inject, observer} from 'mobx-react';
// Custom dependencies
import {Select, InputAutocomplete, Input} from '../../components';
import styles from './SearchForm.component.css';

const SearchFrom = inject('store')(observer(({store}) => {
  // Entity of store
  const form = store.form;

  return (
    <form onSubmit={form.saveFormData} className={styles['search-form']}>
      <Input
        type="text"
        labelTitle="Пользователь:"
        id="user"
        value={form.userInput.value}
        handlerOnChange={form.syncValueUserInput}
        handlerOnBlur={form.getRepositoriesOfUser}
        errorList={form.userErrors}
      />
      <InputAutocomplete
        type="text"
        id="repository"
        labelTitle="Репозиторий:"
        value={form.repositoryInput.value}
        handlerOnChange={form.syncValueRepositoryInput}
        handlerOnClick={form.handlerOnClickAutocompleteItem}
        autocompleteData={form.filteredAutocompleteItemsOfRepository}
        errorList={form.repositoryErrors}
      />
      <Select
        name="limitIssues"
        defaultValue={form.limitOfDownloadableIssues}
        handlerOnChange={form.syncLimitOfDownloadableIssues}
        options={form.selectOptions}
      />
      <button
        className={styles['search-form__submit-button']}
        disabled={form.isDisabledSubmitButton}
      >
        {renderSubmitButtonText(store)}
      </button>
    </form>
  );
}));

SearchFrom.displayName = 'SearchFrom';
export default SearchFrom;

// Render functions
function renderSubmitButtonText({issuesStatus}) {
  if (issuesStatus === 'ready') 
    return 'Поиск';
  return issuesStatus;
}