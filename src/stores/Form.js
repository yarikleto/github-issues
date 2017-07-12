// Develop dependencies
import {
  observable,
  action,
  computed,
  useStrict,
  runInAction,
  extendObservable,
  toJS
} from 'mobx';
import singleton from 'singleton';
// Custom dependencies
import store from './Store';
import api from '../assets/js/api';
import {checkOnFirstStartup, inputsNoError} from '../assets/js/validation/form';
import {checkOnEmptyInput, hasRepositoryAutocompleteItems} from '../assets/js/validation/input';

useStrict(true);

const initialData = {
  cachedDataOfForm: {
    user: null,
    repository: null,
    repositoryAutocompleteData: null,
    limitOfDownloadableIssues: null
  },
  selectOptionsData: [5, 10, 15, 20, 25],
};

export default class Form extends singleton {

  constructor() {
    super();
    extendObservable(this, initialData);
  }

  // Observables data
  @observable
  userInput = {
    value: '',
    errors: null
  };

  @observable
  repositoryInput = {
    value: '',
    errors: null,
    autocompleteData: []
  };

  @observable limitOfDownloadableIssues = 5;
  @observable repositoryStatus = 'ready';

  // Computed functions

  @computed
  get selectOptions() {
    return toJS(this.selectOptionsData);
  }

  @computed
  get userErrors() {
    return toJS(this.userInput.errors);
  }

  @computed
  get repositoryErrors() {
    return toJS(this.repositoryInput.errors);
  }

  @computed
  get isDisabledSubmitButton() {
    if (this.repositoryStatus !== 'ready' || store.issuesStatus !== 'ready') 
      return true;
    
    const formInfo = {
      userInput: this.userInput,
      repositoryInput: this.repositoryInput
    };
    const validationFns = [checkOnFirstStartup, inputsNoError];
    return validationFns.some(validationFn => {
      return validationFn(formInfo);
    });
  };

  /**
   * Проверяет, входит ли подстрока из поля ввода имени репозитория в
   * какой-либо из элементов списка автодополнения
   * @return { string[] } Возвращает новый отфильтрованный массив
   */
  @computed
  get filteredAutocompleteItemsOfRepository() {
    return this
      .repositoryInput
      .autocompleteData
      .filter(item => {
        return item.match(new RegExp(this.repositoryInput.value, 'i'));
      });
  }

  // Action functions

  @action
  loadCacheForm = () => {
    this.userInput.value = this.cachedDataOfForm.user;
    this.userInput.errors = [];
    this.repositoryInput.value = this.cachedDataOfForm.repository;
    this.repositoryInput.errors = [];
    this.repositoryInput.autocompleteData = this.cachedDataOfForm.repositoryAutocompleteData;
  };

  /**
   * Синхронизирует значение поля ввода пользователя со store`ом
   */
  @action
  syncValueUserInput = e => {
    this.userInput.value = e.target.value;
    this.validateUserInput();
  };

  /**
   * Синхронизирует значение поля ввода репозитория со store`ом
   */
  @action
  syncValueRepositoryInput = e => {
    this.repositoryInput.value = e.target.value;
    this.validateRepositoryInput();
  };

  /**
   * Синхронизирует значение поля выбора количества загружаемых обращений со store`ом
   */
  @action
  syncLimitOfDownloadableIssues = e => {
    this.limitOfDownloadableIssues = parseInt(e.target.value);
  };

  @action
  saveFormData = e => {
    e.preventDefault();
    const formData = {
      user: this.userInput.value,
      repository: this.repositoryInput.value,
      limitOfDownloadableIssues: this.limitOfDownloadableIssues
    };
    store.requestIssuesFromApi(formData);
    this.cachingForm();
    this.resetForm();
  };

  /**
   * Загружает данные автодополнения имени репозитория по введенному имени пользователя
   */
  @action
  getRepositoriesOfUser = async() => {
    const userInput = this.userInput.value;
    if (userInput === '') {
      this.repositoryInput.autocompleteData = [];
      return;
    };

    this.repositoryStatus = 'loading';
    const responce = await api.getRepositories(userInput);
    if (responce === null) {
      runInAction(() => {
        this.repositoryStatus = 'failed';
        this.repositoryInput.autocompleteData = [];
      });
      setTimeout(runInAction(() => {
        this.repositoryStatus = 'ready';
      }), 1000);
      return;
    }
    runInAction(() => {
      this.repositoryStatus = 'success';
      this.repositoryInput.autocompleteData = responce.repositories;
    });
    setTimeout(() => {
      runInAction(() => {
        this.repositoryStatus = 'ready';
      });
    }, 1000);
  };

  /**
   * @param {String} itemValue значение, введенное в поле ввода имени репозитория
   * @return {Function} эта функция загружает обращения используя данные, введенные в форму
   */
  @action
  handlerOnClickAutocompleteItem = itemValue => {
    return action(() => {
      const formData = {
        user: this.userInput.value,
        repository: itemValue,
        limitOfDownloadableIssues: this.limitOfDownloadableIssues
      };
      store.requestIssuesFromApi(formData);
      this.cachingForm({
        repository: itemValue,
      });
      this.resetForm();
    });
  };

  // TODO: Нужно перенести валидуцию формы и полей в state компонентов
  @action
  validateUserInput = () => {
    this.userInput.errors = this.validateInput({
      dataOfFilter: {
        input: this.userInput
      },
      validationFns: [checkOnEmptyInput]
    });
  };

  @action
  validateRepositoryInput = () => {
    this.repositoryInput.errors = this.validateInput({
      dataOfFilter: {
        input: this.repositoryInput,
        autocompleteItems: this.filteredAutocompleteItemsOfRepository
      },
      validationFns: [checkOnEmptyInput, hasRepositoryAutocompleteItems]
    });
  };

  // Some function

  validateInput({dataOfFilter, validationFns}) {
    return validationFns
      .map(validationFn => validationFn(dataOfFilter))
      .filter(error => error !== null);
  }

  resetForm = () => {
    this.userInput.value = '';
    this.userInput.errors = null;
    this.repositoryInput.value = '';
    this.repositoryInput.errors = null;
    this.repositoryInput.autocompleteData = [];
  };

  cachingForm = (data = {}) => {
    this.cachedDataOfForm.user = this.userInput.value;
    this.cachedDataOfForm.repository = data.repository || this.repositoryInput.value;
    this.cachedDataOfForm.repositoryAutocompleteData = this.repositoryInput.autocompleteData;
    this.cachedDataOfForm.limitOfDownloadableIssues = this.limitOfDownloadableIssues;
  };

}
