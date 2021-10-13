function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

build_id=makeid(5);

caps = {
  'chrome_latest': {
    "os" : "Windows",
    "os_version" : "10",
    "browserName" : "Chrome",
    "browser_version" : "latest-beta",
    "browserstack.local" : "false",
    "browserstack.selenium_version" : "3.14.0",
    "browserstack.user" : "<username>",
    "browserstack.key" : "<key>",
    "build" : "jest test suite " + build_id
  },
  "firefox_latest": {
    "os" : "Windows",
    "os_version" : "10",
    "browserName" : "Firefox",
    "browser_version" : "latest",
    "browserstack.local" : "false",
    "browserstack.selenium_version" : "3.10.0",
    "browserstack.user" : "<username>",
    "browserstack.key" : "<key>",
    "build" : "jest test suite " + build_id
  },
  'iPhone_11': {
    "os_version" : "14",
    "device" : "iPhone 11",
    "real_mobile" : "true",
    "browserstack.local" : "false",
    "browserstack.user" : "<username>",
    "browserstack.key" : "<key>",
    "browserName" : "iPhone",
    "build" : "jest test suite " + build_id
  }
}

describe.each(['firefox_latest', 'chrome_latest', 'iPhone_11'])('e2e', (cap) => {
  let browser;
  afterEach(async ()=> {
    if(browser && global.results[expect.getState().currentTestName]){
      status = global.results[expect.getState().currentTestName]
      await browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"'+ status +'"}}');
    }
    if(browser)
      await browser.quit()
  })

  test.concurrent("test " + cap, async () => { 
    browser = await global.getBrowser(caps[cap]);
    await browser.get('http://google.fr')
    expect(1).toBe(1)
  }, 20000);
})


describe.each(['firefox_latest', 'chrome_latest', 'iPhone_11'])('e2e 2', (cap) => {
  let browser;
  afterEach(async ()=> {
    if(browser && global.results[expect.getState().currentTestName]){
      status = global.results[expect.getState().currentTestName]
      await browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"'+ status +'"}}');
    }
    if(browser)
      await browser.quit()
  })

  test.concurrent("test " + cap, async () => { 
    browser = await global.getBrowser(caps[cap]);
    await browser.get('http://google.fr')
    expect(1).toBe(1)
  }, 20000);
})






