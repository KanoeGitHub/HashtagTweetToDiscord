# HashtagTweetToDiscord
This is a script for GAS that forwards the specified user's hashtag tweets to Discord.

日本語解説記事はワイのブログ残照
https://kanoe.studio/archives/1460


## 複数のTwitterアカウント用に運用する場合

例えば、getMyHashTweets関数について次のように引数を設定します。
```
function getMyHashTweets(screenName, serchString, count){ ... 
```

変数 json の値は次のように変更します。
```
var json = service.fetch('https://api.twitter.com/1.1/search/tweets.json?q=from%3A'+screenName+'%20'+serchString+ '&count='+count+ { 'headers': bearer_auth_header });
```

日時の比較の箇所の変数b の値は、アカウント毎に日付を管理しないといけないため、keyの名前を
##次のように変更します。
```
var b = new Date(scriptProperties.getProperty(screenName + 'Date'));
```

Twitterのリンク表示文を変更します。
```
sendToDiscord(status.user.name, "https://twitter.com/" + status.user.screen_name + "/status/" + status.id_str, Webhook); 
```

最後に最終日時の更新の箇所のkeyの名前を変更します。
```
scriptProperties.setProperty(screenName + 'Date', status.created_at); //最終日時更新
```

## 複数のDiscord Webhook に対応する場合
sendToDiscord関数にwebhook用の引数を追加し。それに伴って WEBHOOK_URLに代入する値も変更します。
```
unction sendToDiscord(user, cont, webhook){
  const WEBHOOK_URL = webhook;
  ...
```
次にgetMyHashTweets関数についても同様にwebhook用の引数の追加と、getMyHashTweets内のsendToDiscord関数についても代入値を変更します。
```
function getMyHashTweets(screenName, serchString, count, Webhook) 
...
      sendToDiscord(status.user.name, "https://twitter.com/" + status.user.screen_name + "/status/" + status.id_str, Webhook); 
...
```



