require('chromedriver')
const webdriver=require('selenium-webdriver')
let until=webdriver.until;
var by = webdriver.By;
var fs = require("fs")
var path = require("path");
const web=new webdriver.Builder().forBrowser('chrome').build()
var picpath = path.join(__dirname,"看枫傻不傻.png")
web.get('http://192.168.198.129:3000/')
web.manage().window().maximize()
web.findElement(by.css('body > div.navbar > div > div > ul > li:nth-child(5) > a')).click()  // 注册按钮
web.sleep(1000)
 //  登录操作
web.findElement(by.css('body > div.navbar > div > div > ul > li:nth-child(6) > a')).click()
web.findElement(by.id('name')).sendKeys('xufeng')
web.findElement(by.id('pass')).sendKeys('xf13451082032')
web.findElement(by.id('pass')).submit();                   
 //点击发布话题                            
web.findElement(by.className('span-success')).click()                                  
web.sleep(2000)
web.findElement(by.id('tab-value')).click() 
web.findElement(by.css('#tab-value > option:nth-child(2)')).click()                     //选择第二行的元素
web.findElement(by.id('title')).sendKeys('交友聊天相亲招聘交流群')                                 //输入标题
//定位正文元素 位置并且输入文字
web.findElement(by.css('.CodeMirror.cm-s-paper')).click()
let txt = web.findElement(by.xpath('//*[@id="create_topic_form"]/fieldset/div/div/div[2]/div[6]/div[2]'))
web.actions().mouseMove(txt).sendKeys("可以在楼下回复如：你好啊，交个朋友吧").perform()
//  添加链接   
web.findElement(by.className("eicon-link")).click()
web.sleep(1000)
web.findElement(by.xpath('/html/body/div[4]/div[2]/form/div[1]/div/input')).sendKeys('百度')
web.findElement(by.xpath('/html/body/div[4]/div[2]/form/div[2]/div/input')).sendKeys('www.baidu.com')
web.findElement(by.className("btn btn-primary")).click()
web.sleep(1000)
web.sleep(1000)
//添加图片  
web.findElement(by.css('.eicon-image')).click()
web.findElement(by.name('file')).sendKeys(picpath)
web.sleep(3000)
 // 提交话题    有点问题    使用正文中元素submit方法提交话题
 web.findElement(by.className('CodeMirror cm-s-paper')).submit()
 web.sleep(2000)
//添加回复 
// web.findElement(by.xpath('//*[@id="reply_form"]/div/div/div[2]/div[6]')).click()
// web.findElement(by.xpath('//*[@id="reply_form"]/div/div/div[2]/div[6]/div[1]/div/div/div/div[1]')).sendKeys("傻傻的枫， 我也喜欢你")
web.findElement(by.css('.CodeMirror.cm-s-paper')).click()
let reply = web.findElement(by.xpath('//*[@id="reply_form"]/div/div/div[2]/div[1]'))
web.actions().mouseMove(reply).sendKeys("你好帅啊").perform()
//添加回复中的图片
web.findElement(by.css('.eicon-image')).click()
web.findElement(by.name('file')).sendKeys(path.join(__dirname,"辣眼睛.jpg"))
web.sleep(1000)
//添加回复中的链接
web.findElement(by.className("eicon-link")).click()
web.sleep(1000)
web.findElement(by.xpath('/html/body/div[4]/div[2]/form/div[1]/div/input')).sendKeys('新浪')
web.findElement(by.xpath('/html/body/div[4]/div[2]/form/div[2]/div/input')).sendKeys('www.sina.com')
web.findElement(by.className("btn btn-primary")).click()
web.sleep(1000)
web.findElement(by.className('span-primary submit_btn')).click() 