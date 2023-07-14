[[toc]]

## Android 上架到谷歌应用商店遇到的问题

- 签名问题

  应用在 Google play 上架后打开 APP 使用第三方登录、分享（微信）等功能就会弹出下面的错误
  <div>
    <img src="/public/images/topo/error.jpg" />
  </div>

  原因：在谷歌 Google Play 管理中心创建应用加入了谷歌的签名计划
  加入了谷歌签名计划导致的问题暂时没有解决，就算重新更新签名密钥也没有效果。。。。
   <div>
    <img src="/public/images/topo/google.png" />
  </div>

## IOS APP Store 审核被拒及解决方案

[这里先附上 App Store 审核指南](https://developer.apple.com/cn/app-store/review/guidelines/)

### Guideline 2.1 - Information Needed

#### 2.1.0 Performance: App Completeness

1. Is your app restricted to users who are part of a single company? This may include users of the company's partners, employees, and contractors.
2. Is your app designed for use by a limited or specific group of companies?

- If yes, which companies use this app?
- If not, can any company become a client and utilize this app?

3. What features in the app, if any, are intended for use by the general public?
4. How do users obtain an account?
5. Is there any paid content in the app and if so who pays for it? For example, do users pay for opening an account or using certain features in the app?

翻译下来就是：

1. 您的应用程序是否仅限于同一公司的用户？ 这可能包括公司合作伙伴、员工和承包商的用户。
2. 您的应用程序是否专为有限或特定的公司集团使用而设计？

- 如果是，哪些公司使用此应用程序？
- 如果没有，任何公司都可以成为客户并使用此应用程序吗？

3. 应用程序中的哪些功能（如果有）是供公众使用的？
4. 用户如何获得账号？
5. 应用程序中是否有付费内容？如果有，由谁付费？ 例如，用户是否需要为开设帐户或使用应用程序中的某些功能付费？

---

其实这个还好，你只要在回复中逐一回复他就行了，像这样：

Hello,
Thank you for your reply.In response to your question, I have the following answers

1. Is your app restricted to users who are part of a single company? This may include users of the company's partners, employees, and contractors.

   -->This app is designed for all users, and each user is equal.

2. Is your app designed for use by a limited or specific group of companies?

- If yes, which companies use this app?
- If not, can any company become a client and utilize this app?

  -->No, every user is equal.Every company and everybody can register and use this app themselves.

3. What features in the app, if any, are intended for use by the general public?

   -->Every company and individual can use this app equally.

4. How do users obtain an account?

   -->Through the login page of the app, everyone can register and obtain an account by themselves.

5. Is there any paid content in the app and if so who pays for it? For example, do users pay for opening an account or using certain features in the app?

   -->The content in the app is all free.

### Guideline 3.2 - Business

3.2.0 Business: Other Business Model Issues

We found in our review that your app is intended to be used by a specific business or organization, including partners, clients, or employees, but you've selected public distribution on the App Store in App Store Connect. Since the App Store is intended for apps with a public audience, we recommend reviewing the other distribution options available to you through your Apple Developer Program Account.

---

出现这个有可能是应用没有注册功能，苹果那边会觉得你是给特定人员使用的，不应该在 APP store 公开发放。但是我们的应用有时候确实是不需要注册功能，是由管理后台创建的账号。这个问题我是从网上找的解决方法，直接回复苹果审核员：

Dear Apple team, hello and thank you for your patient review

Regarding 3.2.0 Business: Other Business Model Issues, we have the following explanation.
Our app is mainly released in China and used by industry professionals for work.
The main purpose of our app development is to enable all industry professionals to use our app for work and improve their work efficiency.
And the app is completely free.If we characterize our app as an internal application now, it would be inconvenient for us to iterate over the new version. Perhaps some of the features are not yet complete, but we will do better in the future.
Please continue to review our application and feel free to contact me if you have any questions. I will provide you with an answer. Thank you.

    My email: xxx.com
    Sincere greetings

没想到审核过了，本来打算增加一个注册功能的。。。

### Guideline 5.1.1 - Legal - Privacy - Data Collection and Storage

We noticed that your app requests the user’s consent to access the location, but doesn’t sufficiently explain the use of the location in the purpose string.
To help users make informed decisions about how their data is used, permission request alerts need to explain and include an example of how your app will use the requested information.

Next Steps

Please revise the purpose string in your app’s Info.plist file for the location to explain why your app needs access and include an example of how the user's data will be used.

You can modify your app's Info.plist file using the property list editor in Xcode.

---

这个被拒其实很简单，就是你的应用在访问手机权限的时候（定位、相机、相册等）没有给出具体描述所以被拒了，解决方案他已经给你了，如果你是 Xcode 开发的，只需要在 Info.plist 文件加上描述就好了，如果是 uniapp 开发的，那就找到 manifest.json 文件里面的‘APP 权限配置’下的"ios 隐私信息访问的许可描述"，用到哪些权限就加上描述

这个里面还有最重要的一条（隐私协议跟用户协议就不用说了，这个肯定要有），你在[5.1.1 Data Collection and Storage Account Sign-In：](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage)可以看到，必须要在 App 内提供账户删除功能，如果苹果审核的时候发现没有账号注销功能，也是不能通过的哦~
