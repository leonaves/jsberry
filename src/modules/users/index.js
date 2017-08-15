const { routes } = require('./config.json');

module.exports = ({ ACTIONS, ROUTER, utils }) => {

  /**
   *****************************************
   * GET CORRECT ACTIONS NAMES FROM CONFIG *
   *****************************************
   */

  const { users_auth } = utils.convertkeysToDots(routes);

  /**
   *************************************
   * ADD USERS ROUTES TO ACTIONS TREAD *
   *************************************
   */

  ROUTER.routes = Object.assign(ROUTER.routes, routes);

  /**
   ************************************
   * SUBSCRIBE TO USERS AUTHORIZATION *
   ************************************
   *
   * @param  {object} headers - http headers
   * @param  {object} query - parameters from the url
   * @param  {object} body - parameters from json body
   * @return {promise} - success response or error
   */
  ACTIONS.on(users_auth, ({ headers, query, body }) => {

    const response = { name: 'John', surname: 'Dou' };

    return (response.name) ?
      Promise.resolve(response) :
      Promise.reject({ error: { message: 'name not exist!' } });

  });

  /**
   ***************************
   * CLEAR USER AUTH ACTIONS *
   ***************************
   *
   * method for clean unstoppable functions
   * for example: listen port
   */
  ACTIONS.on('clear.users.auth', () => {

    return Promise.resolve();

  });

};