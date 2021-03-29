wgact=function (){
const wgactDeduper={
keyName:'_wgact_order_ids',
cookieExpiresDays: 365
};
function writeOrderIdToStorage(orderId, expireDays=365){
if(!window.Storage){
let expiresDate=new Date();
expiresDate.setDate(expiresDate.getDate() + wgactDeduper.cookieExpiresDays);
let ids=[];
if(checkCookie()){
ids=JSON.parse(getCookie(wgactDeduper.keyName));
}
if(!ids.includes(orderId)){
ids.push(orderId);
document.cookie=wgactDeduper.keyName + '=' + JSON.stringify(ids) + ';expires=' + expiresDate.toUTCString();
}}else{
if(localStorage.getItem(wgactDeduper.keyName)===null){
let ids=[];
ids.push(orderId);
window.localStorage.setItem(wgactDeduper.keyName, JSON.stringify(ids));
}else{
let ids=JSON.parse(localStorage.getItem(wgactDeduper.keyName));
if(!ids.includes(orderId)){
ids.push(orderId);
window.localStorage.setItem(wgactDeduper.keyName, JSON.stringify(ids));
}}
}
if(typeof wgactStoreOrderIdOnServer==='function'&&wgact_order_deduplication){
wgactStoreOrderIdOnServer(orderId);
}}
function getCookie(cname){
let name=cname + "=";
let ca=document.cookie.split(';');
for (let i=0; i < ca.length; i++){
let c=ca[i];
while (c.charAt(0)===' '){
c=c.substring(1);
}
if(c.indexOf(name)===0){
return c.substring(name.length, c.length);
}}
return "";
}
function checkCookie(){
let key=getCookie(wgactDeduper.keyName);
return key!=="";
}
function isOrderIdStored(orderId){
if(wgact_order_deduplication){
if(!window.Storage){
if(checkCookie()){
let ids=JSON.parse(getCookie(wgactDeduper.keyName));
return ids.includes(orderId);
}else{
return false;
}}else{
if(localStorage.getItem(wgactDeduper.keyName)!==null){
let ids=JSON.parse(localStorage.getItem(wgactDeduper.keyName));
return ids.includes(orderId);
}else{
return false;
}}
}else{
return false;
}}
return {
writeOrderIdToStorage: writeOrderIdToStorage,
isOrderIdStored:isOrderIdStored
}}();
jQuery(function (){
if(wooptpmDataLayer.pixels&&wooptpmDataLayer.pixels.dynamic_remarketing&&wooptpmDataLayer.shop.page_type==='product'){
for (const [key, value] of Object.entries(wooptpmDataLayer.visible_products)){
if(! jQuery('.post-' + key)[0]){
delete wooptpmDataLayer.visible_products[key];
}}
gtag('event', 'view_item_list', {
"items": [get_view_item_products(wooptpmDataLayer.visible_products)]
});
}});
jQuery(function (){
if(wooptpmDataLayer.pixels&&wooptpmDataLayer.pixels.dynamic_remarketing&&wooptpmDataLayer.shop.page_type==='cart'){
gtag('event', 'view_item_list', {
"items": [get_view_item_products(wooptpmDataLayer.upsell_products)]
});
}});
function get_view_item_products(productList){
let data=[];
for (const [key, value] of Object.entries(productList)){
data.push({
'id':value['id'],
'name':value['name'],
'brand':value['brand'],
'category': value['category'],
'quantity': 1,
'price':value['price'],
});
}
return data;
};
jQuery(function($){
if(typeof wpmenucart_ajax_assist.shop_plugin!=='undefined'&&wpmenucart_ajax_assist.shop_plugin.toLowerCase()=='woocommerce'){
wpmenucart_update_menu_classes();
$(document.body).on('adding_to_cart added_to_cart updated_wc_div', wpmenucart_update_menu_classes);
}
function wpmenucart_update_menu_classes(){
if(typeof window.Cookies!=='undefined'){
items_in_cart=Cookies.get('woocommerce_items_in_cart');
}else if(typeof $.cookie!=='undefined'&&$.isFunction($.cookie)){
items_in_cart=$.cookie('woocommerce_items_in_cart');
}else{
return;
}
if(items_in_cart > 0){
$('.empty-wpmenucart-visible').removeClass('empty-wpmenucart-visible');
$('.empty-wpmenucart').removeClass('empty-wpmenucart');
$('li.wpmenucart').removeClass('empty');
}else{
if(!(wpmenucart_ajax_assist.always_display)){
$('li.wpmenucart').addClass('empty');
$('.wpmenucartli').addClass('empty-wpmenucart');
$('.wpmenucart-shortcode').addClass('empty-wpmenucart');
}else{
$('wpmenucart-contents').addClass('empty-wpmenucart-visible');
}}
}});