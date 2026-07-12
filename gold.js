const mapping = {
    '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
    'Locket': ['Gold']
};

var user_agent = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);
obj.subscriber = obj.subscriber || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};
obj.Attention = "Kích hoạt Locket Gold thành công";

// https://www.revenuecat.com/docs/api-v1#tag/customer_info_model
var FakeSub = {
    billing_issues_detected_at: null,
    expires_date: "2999-01-01T00:00:00Z",
    grace_period_expires_date: null,
    is_sandbox: false,
    original_purchase_date: "2026-06-16T00:00:00Z",
    ownership_type: "PURCHASED",
    period_type: "normal",
    purchase_date: "2026-06-16T00:00:00Z",
    store: "app_store",
    unsubscribe_detected_at: null,
};

var FakeEntitlements = {
    expires_date: "2999-01-01T00:00:00Z",
    grace_period_expires_date: null,
    product_identifier: "com.locket.Locket.premium.yearly",
    purchase_date: "2026-06-16T00:00:00Z",
};

const match = Object.keys(mapping).find(e => user_agent.includes(e));
if (match) {
    let [e, s] = mapping[match];
    
    if (s) {
        FakeEntitlements.product_identifier = s;
        obj.subscriber.subscriptions[s] = FakeSub;
    } 
    else {
        obj.subscriber.subscriptions["com.locket.Locket.premium.yearly"] = FakeSub;
    }
    
    obj.subscriber.entitlements[e] = FakeEntitlements;
}     
else {
    obj.subscriber.subscriptions["com.locket.Locket.premium.yearly"] = FakeSub;
    obj.subscriber.entitlements.pro = FakeEntitlements;
}

$done({body: JSON.stringify(obj)});