import jsonp from 'browser-jsonp';

// TODO: ПЕРЕДЕЛАТЬ НА NodeJS(KoaJS)

// При необходимости, обращение к api и преобразование данных можно перенести на
// серверную часть без лишних проблем.
// Решил попробовать jsonp
class Api {
  /**
   * Получить все обращения пользователя в нужном репозитории
   * @param {String} user Имя пользователя
   * @param {String} repository Название репозитория пользователя
   * @param {Number} limitOfDownloadableIssues Какое количество обращений загрузить
   * @param {Number} numberChunk Какая по счету часть данных загружется с api
   * @return {Promise<Object>}
   */
  requestIssues({
    user,
    repository,
    limitOfDownloadableIssues
  }, numberChunk) {
    return new Promise((resolve, reject) => {
      jsonp({
        url: `https://api.github.com/repos/${user}/${repository}/issues`,
        data: {
          page: numberChunk || 1,
          per_page: limitOfDownloadableIssues
        },
        success: responce => {
          if (responce.meta.status !== 200) {
            resolve(null);
            return;
          };
          const isMaxNumberIssues = responce.data.length < limitOfDownloadableIssues
            ? true
            : false;
          const issues = this.conversionDataIntoIssues(responce.data);
          resolve({issues, isMaxNumberIssues});
        }
      });
    });
  }

  /**
   * Получить все репозитории данного пользователя
   * @param {String} user имя пользователя
   * @return {Promise<Object>}
   */
  getRepositories(user) {
    return new Promise((resolve, reject) => {
      jsonp({
        url: `https://api.github.com/users/${user}/repos`,
        data: null,
        success: responce => {
          if (responce.meta.status !== 200) {
            resolve(null);
            return;
          };
          resolve({
            repositories: this.conversionDataIntoRepositoriesNames(responce.data)
          });
        }
      });
    });
  }

  /**
   * Преобразует полученные данные в обращения
   *
   * @param {Object} data обьект данных из api
   * @return {object[]} возвращает массив обьектов обращений
   */
  conversionDataIntoIssues = (data) => {
    return data.map(issue => {
      return {
        id: issue.id,
        number: issue.number,
        userAvatar: issue.user.avatar_url,
        userGithubLink: issue.user.html_url,
        title: issue.title,
        openingDate: issue.created_at,
        body: issue.body,
        nickname: issue.user.login,
      };
    });
  }

  /**
   * Преобразует полученные данные в имена репозиториев
   * @param {Object} data обьект данных из api
   * @return {string[]} возвращает массив имен репозиториев
   */
  conversionDataIntoRepositoriesNames = (data) => {
    return data.map(repository => {
      return repository.name;
    });
  }
}

const api = new Api();
export default api;
