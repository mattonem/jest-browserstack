// my-custom-environment
const NodeEnvironment = require('jest-environment-node');
const webdriver = require('selenium-webdriver');
class CustomEnvironment extends NodeEnvironment {

  async setup() {
    await super.setup();
    this.global.results = [];
    this.global.browsers= [];
    this.global.getBrowser =  async function getBrowser(cap)  {
      return  await new webdriver.Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(cap)
      .build();
    };
   
  }

  async handleTestEvent(event, state) {
    if (event.name === 'test_fn_failure') {
      this.global.results[event.test.parent.name + " " + event.test.name] = 'failed'
    }
    if (event.name === 'test_fn_success') {
      this.global.results[event.test.parent.name + " " + event.test.name] = 'passed'
    }
  }
}

module.exports = CustomEnvironment;