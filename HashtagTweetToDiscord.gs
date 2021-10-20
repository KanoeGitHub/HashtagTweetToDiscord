//時刻の初期設定です。初回に実行してください。
function scriptPropatiesReset(){
	//スクリプトプロパティを取得
	const scriptProperties = PropertiesService.getScriptProperties();
	
	const data = scriptProperties.getProperties();
	for (var key in data) {
		Logger.log('キー: %s, 値: %s', key, data[key]);
	}
}


//Twitter認証関連です。ライブラリとしてTwitterWebServiceを仕様しています。
//基本的に最初のauthorize関数のみの実行後ログに表示されるURLから認証してください。
//TwitterDev側でコールバックURL設定をしておかないとうまくいきません。
var twitter = TwitterWebService.getInstance(
 'API Token',
 'API secret Token'
);

// 認証を行う（必須）
function authorize() {
	twitter.authorize();
}

// 認証をリセット
function reset() {
	twitter.reset();
}

// 認証後のコールバック（必須）
function authCallback(request) {
	return twitter.authCallback(request);
}
//↑↑ここまではTwitter関連

//Discordに送るための関数
function sendToDiscord(user, cont, webhook) {
	
	//取得したWebhookURLを追加
	const WEBHOOK_URL = webhook; 
	
	//Discordに送信する変数
	const payload = {
		username: user,
		content: cont,
	};

	UrlFetchApp.fetch(WEBHOOK_URL, {
		method: "post",
		contentType: "application/json",
		payload: JSON.stringify(payload),
	});
}

//ここがトリガー設定して回す関数
function getMyHashTweets(screenName, serchString, count, Webhook) {
	const bearer_token = '任意のBearer_Token'
	var service  = twitter.getService();
	var bearer_auth_header = {
		'Authorization': 'Bearer ' + bearer_token
	};

	var json = service.fetch('https://api.twitter.com/1.1/search/tweets.json?q=from%3A'+screenName+'%20'+serchString+ '&count='+count+ { 'headers': bearer_auth_header });

	var array = JSON.parse(json);
	array.statuses.reverse();

	//スクリプトプロパティを取得
	const scriptProperties = PropertiesService.getScriptProperties();
	
	array.statuses.forEach(function(status) {    
		Logger.log(status.user.screen_name +":"+ status.created_at);
		var a = new Date(status.created_at);
		var b = new Date(scriptProperties.getProperty(screenName + 'Date'));

		//日時の比較
		if(a>b){ 
			Logger.log(status.text);
			
			//Tweetの本文のみを表示させる場合
			//sendToDiscord(status.user.name, status.text.replace("#shijimi","")); 
			
			//Tweetのリンクを表示させる場合
			sendToDiscord(status.user.name, "https://twitter.com/" + status.user.screen_name + "/status/" + status.id_str, Webhook); 
			
			scriptProperties.setProperty(screenName + 'Date', status.created_at); //最終日時更新
		}
	});
	
	return array;
}


//以下に任意の関数を作り、それをトリガーとして使用します
//絞りたいワードに ハッシュタグ を含める場合は、# の代わりに %23 をつけてください
//例: #Apex の場合は %23Apex 

//例(ApexLegends公式アカウント @playApex　の場合）
function apexOfficial(){
	const webhook = "WEBHOOK_URL";
	
	//getMyHashTweets("アカウント名", "絞りたいワード", 最大件数, webhook );
	getMyHashTweets("PlayApex", "", 10, webhook );
}