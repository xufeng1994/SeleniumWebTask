require('chromedriver')
const webdriver = require('selenium-webdriver')
let until = webdriver.until;
const by = webdriver.By;
const fs = require("fs")
const path = require("path");
let chrome = require("selenium-webdriver/chrome")
let web;
const web = new webdriver.Builder().forBrowser('chrome').build();
const picpath = path.join(__dirname, "看枫傻不傻.png")
var assert = require('assert');
describe('hooks', function () {
    this.timeout(120 * 1000)
    describe('用户登录发布话题并回复', async function () {
        before(function () {
            // runs before all tests in this block
            console.log("before")
            web = new webdriver.Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
            return web.executeScript(function() {
                return {
                    width: window.screen.availWidth,
                    height: window.screen.availHeight
                };
            }).then(function (result) {
                web.manage().window().setSize(result.width, result.height);
            })
        })

        after(function () {
            // runs after all tests in this block
            console.log('after');
            return web.quit();
        });

        beforeEach(function () {

        });

        afterEach(async function () {
            // runs after each test in this block
            //在每一步完成后添加截图
            console.log("afterEach")
            await web.takeScreenshot().then(function (screenshot) {
                return fs.writeFileSync(new Date().valueOf() + ".png", screenshot, "base64")
            });
        });

        it('导航到登录页面', async function () {
            await web.get("http://192.168.198.129:3000")
        });
        it('最大化窗口', async function () {
            await web.manage().window().maximize()
        });
        it('点击注册按钮', async function () {
            await web.findElement(by.xpath('/html/body/div[1]/div/div/ul/li[5]/a')).click();

            // await web.findElement(by.css('body > div.navbar > div > div > ul > li:nth-child(5) > a')).click()  // 注册按钮
        });

        it('进入登录界面', async function () {
            await web.findElement(by.css('body > div.navbar > div > div > ul > li:nth-child(6) > a')).click()


        });
        it('输入账号', async function () {
            await web.findElement(by.id('name')).sendKeys('xufeng')
        });
        it('输入密码', async function () {
            await web.findElement(by.id('pass')).sendKeys('xf13451082032')
        });
        it('点击登录', async function () {
            await web.findElement(by.id('pass')).submit();
        });

        it('点击发布话题进入编辑界面', async function () {
            let geturl = await web.getCurrentUrl();
            console.log("geturl", geturl);
            await web.findElement(by.className('span-success')).click()
        });
        it('选择模块', async function () {
            await web.findElement(by.id('tab-value')).click()
            await web.findElement(by.css('#tab-value > option:nth-child(2)')).click()    // //选择第二行的元素
        });
        it('输入标题', async function () {
            await web.findElement(by.id('title')).sendKeys('交友聊天相亲招聘交流群')                                 //输入标题
        });
        it('输入正文', async function () {
            await web.findElement(by.css('.CodeMirror.cm-s-paper')).click()
            let txt = web.findElement(by.xpath('//*[@id="create_topic_form"]/fieldset/div/div/div[2]/div[6]/div[2]'))
            await web.actions().mouseMove(txt).sendKeys("可以在楼下回复如：你好啊，交个朋友吧").perform()
        });
        it('添加网址链接', async function () {
            //定位正文元素 位置并且输入文字
            await web.findElement(by.className("eicon-link")).click()
            await web.sleep(1000)
            await web.findElement(by.xpath('/html/body/div[4]/div[2]/form/div[1]/div/input')).sendKeys('百度')
            await web.findElement(by.xpath('/html/body/div[4]/div[2]/form/div[2]/div/input')).sendKeys('www.baidu.com')
            await web.findElement(by.className("btn btn-primary")).click()
        });
        it('添加图片', async function () {
            web.actions().mouseMove(web.findElement(by.css('.eicon-image'))).click().perform();
            // await web.findElement(by.css('.eicon-image')).click()
            await web.findElement(by.name('file')).sendKeys(picpath)
        });

    })
})