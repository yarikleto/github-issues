// Develop dependencies
import {
  observable,
  action,
  useStrict,
  runInAction,
  extendObservable
} from 'mobx';
import singleton from 'singleton';
// Custom dependencies
import api from '../assets/js/api';
import Form from './Form';

useStrict(true);

const initialData = {
  /**
   * Какая по счету часть данных загружется с api
   */
  numberChunkOfDownloadedIssues: 1,
  isDisplayDownloadIssuesButton: false,
  form: null,
};

class Store extends singleton {

  constructor() {
    super();
    extendObservable(this, initialData);
    this.form = new Form();
  }

  // Observables data
  @observable issues = [];
  @observable issuesStatus = 'ready';

  // Action functions

  @action
  toggleDisplayDownloadIssuesButton = () => {
    this.isDisplayDownloadIssuesButton = !this.isDisplayDownloadIssuesButton;
  };

  @action
  requestIssuesFromApi = async formData => {
    this.issuesStatus = 'loading';
    const responce = await api.requestIssues(formData);
    if (responce === null) {
      runInAction(() => {
        this.issuesStatus = 'failed';
        this.form.loadCacheForm();
      });
      setTimeout(() => {
        runInAction(() => {
          this.issuesStatus = 'ready';
        });
      }, 1000);
      return;
    }
    runInAction(() => {
      this.issuesStatus = 'success';
      this.issues = responce.issues;
      this.isDisplayDownloadIssuesButton = !responce.isMaxNumberIssues;
      this.form.resetForm();
    });
    setTimeout(() => {
      runInAction(() => {
        this.issuesStatus = 'ready';
      });
    }, 1000);
  };

  @action
  downloadMoreIssues = async() => {
    this.toggleDisplayDownloadIssuesButton();
    this.issuesStatus = 'loading';
    this.numberChunkOfDownloadedIssues += 1;
    const numberChunk = this.numberChunkOfDownloadedIssues;
    const cachedDataOfForm = this.form.cachedDataOfForm;

    const responce = await api.requestIssues(cachedDataOfForm, numberChunk);
    if (responce === null) {
      runInAction(() => {
        this.toggleDisplayDownloadIssuesButton();
        this.issuesStatus = 'failed';
      });
      setTimeout(() => {
        runInAction(() => {
          this.issuesStatus = 'ready';
        });
      }, 1000);
      return;
    }
    runInAction(() => {
      this.toggleDisplayDownloadIssuesButton();
      this.issuesStatus = 'success';
      this.issues = [
        ...this.issues,
        ...responce.issues
      ];
      this.isDisplayDownloadIssuesButton = !responce.isMaxNumberIssues;
    });
    setTimeout(() => {
      runInAction(() => {
        this.issuesStatus = 'ready';
      });
    }, 1000);
  };


  // Custom functions

  getIssueByNumber = (number) => {
    return this
      .issues
      .find(issue => issue.number === parseInt(number));
  }

}

const store = Store.get();
export default store;
