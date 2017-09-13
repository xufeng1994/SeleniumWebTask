require('chromedriver')
const webdriver = require('selenium-webdriver')
let until = webdriver.until;
var by = webdriver.By;
var fs = require("fs")
var path = require("path");
var web = new webdriver.Builder().forBrowser('chrome').build()
var picpath = path.join(__dirname, "看枫傻不傻.png")

// 添加循环
describe('hooks', function () {
    this.timeout(60*1000)
    var assert = require('assert');

    before(function () {
        // runs before all tests in this block
        console.log("before")
    })


    after(function () {
        // runs after all tests in this block

    });

    beforeEach(function () {

    });

    afterEach(async function () {
        // runs after each test in this block
        console.log("after")
        await web.takeScreenshot().then(function (screenshot) {
            fs.writeFileSync(new Date().valueOf() + ".png", screenshot, "base64")

        });
    });

    describe('用户登录发布话题并回复', async function () {

        
        describe('注册', function () {
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
        })
        describe('登录', function () {
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

        })
        describe("发布话题", function () {
            
            it('点击发布话题进入编辑界面', async function () {
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
            it('点击提交', async function () {
                await web.findElement(by.className('CodeMirror cm-s-paper')).submit()
            });
        });
        describe('添加回复', function () {
            
            it('进入回复编辑界面', async function () {
                await web.findElement(by.css('.CodeMirror.cm-s-paper')).click()
            });
            it('输入正文', async function () {
                let reply = web.findElement(by.xpath('//*[@id="reply_form"]/div/div/div[2]/div[1]'))
                await web.actions().mouseMove(reply).sendKeys("你好帅啊").perform()
            });
            it('添加图片', async function () {
                await web.findElement(by.css('.eicon-image')).click()
                await web.findElement(by.name('file')).sendKeys(path.join(__dirname, "辣眼睛.jpg"))
                await web.sleep(1000)
            });
            it('添加链接', async function () {
                web.actions().mouseMove(web.findElement(by.className("eicon-link"))).click().perform();
                //await web.findElement(by.className("eicon-link")).click()
                await web.sleep(1000)



              
                

            });
            it('输入标题', async function () {
                await web.findElement(by.xpath('/html/body/div[4]/div[2]/form/div[1]/div/input')).sendKeys('新浪')
            });
            it('输入网址', async function () {
                await web.findElement(by.xpath('/html/body/div[4]/div[2]/form/div[2]/div/input')).sendKeys('www.sina.com')
                await web.findElement(by.className("btn btn-primary")).click()
                await web.sleep(1000)
            });

            it('提交回复', async function () {
                await web.findElement(by.className('span-primary submit_btn')).click()
            });

        });

    });
});









