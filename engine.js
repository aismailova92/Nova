var icol=0;
let cells,allocations,currentSettings;
function round(x,n){let p=10**n,y=Math.abs(x)*p,f=Math.floor(y),r=y-f;let z=Math.abs(r-0.5)<1e-9?(f%2?f+1:f):Math.round(y);return Math.sign(x)*z/p;}
var currday=0;
var cardacc=0;
var privatefunds=0;
var tmpprivatfunds=0;
var loanacc=0;
var loanacc_cur=0;
var loanacc_prev=0;
var notaccruedinterest_cur=0;
var notaccruedinterest_prev=0;
var reserveacc=0;
var loan_percent=0;
var mep_loan=0;
var mep_loan_percent=0;
var mep_potential_interest=0;
var notusedlimit=0;
var overdue_percent=0;
var overdue_loan=0;
var overdue_days=0;
var peny=0;
var ovdcomiss=0;
var fulldebt=0;
var usedamount=0;
var reserveamount=0;
var minpayment=0;
var minpayment_main=0;
var minpayment_potential=0;
var minpayment_persent=0;
var minpayment_peny=0;
var interestfreepayment=0;
var avlamount=0;
var rind_currday=0;
var rind_cardacc=0;
var rind_privatfunds=0;
var rind_loanacc=0;
var rind_loanacc_cur=0;
var rind_loanacc_prev=0;
var rind_notaccruedinterest_cur=0;
var rind_notaccruedinterest_prev=0;
var rind_reserveacc=0;
var rind_loan_percent=0;
var rind_mep_loan=0;
var rind_mep_loan_percent=0;
var rind_mep_potential_interest=0;
var rind_notusedlimit=0;
var rind_overdue_percent=0;
var rind_overdue_loan=0;
var rind_overdue_days=0;
var rind_peny=0;
var rind_ovdcomiss=0;
var rind_fulldebt=0;
var rind_usedamount=0;
var rind_reserveamount=0;
var rind_minpayment=0;
var rind_minpayment_main=0;
var rind_minpayment_potential=0;
var rind_minpayment_persent=0;
var rind_minpayment_peny=0;
var rind_interestfreepayment=0;
var rind_avlamount=0;
function cleardata(){
var result=0;
for(var col=2;col<=271;col++){
cells[7][col]=0;
}
return result;
}
function getprevdayvalue(row,column){
var result=0;
if(column == 2){
result=0;
}else{
result=cells[row][column - 1];
}
return result;
}
function getcurrdayvalue(row,column){
var result=0;
result=cells[row][column];
return result;
}
function card2privatetransfer(cardaccval,privatefundsval){
var result=0;
var basevalues={"privatefunds": 0, "accountbalance": 0, "repayamount": 0};
basevalues.privatefunds=cardaccval + privatefundsval;
result=basevalues;
return result;
}
function transferCore(privatefundsval,accountval,accounttypeval){
var result=0;
var basevalues={"privatefunds": 0, "accountbalance": 0, "repayamount": 0};
if(accounttypeval == "ovdcomiss" && privatefundsval > 0){
if(privatefundsval + accountval >= 0){
basevalues.privatefunds=privatefundsval + accountval;
basevalues.accountbalance=0;
basevalues.repayamount=Math.abs(accountval);
}else{
basevalues.privatefunds=0;
basevalues.accountbalance=privatefundsval + accountval;
basevalues.repayamount=privatefundsval;
}
}else if(accounttypeval == "mep_potential_interest" && privatefundsval > 0){
if(privatefundsval + accountval >= 0){
basevalues.privatefunds=privatefundsval + accountval;
basevalues.accountbalance=0;
basevalues.repayamount=Math.abs(accountval);
}else{
basevalues.privatefunds=0;
basevalues.accountbalance=privatefundsval + accountval;
basevalues.repayamount=privatefundsval;
}
}else if(accounttypeval == "peny" && privatefundsval > 0){
if(privatefundsval + accountval >= 0){
basevalues.privatefunds=privatefundsval + accountval;
basevalues.accountbalance=0;
basevalues.repayamount=accountval;
}else{
basevalues.privatefunds=0;
basevalues.accountbalance=privatefundsval + accountval;
basevalues.repayamount=privatefundsval;
}
}else if(accounttypeval == "overdue_percent" && privatefundsval > 0){
if(privatefundsval + accountval >= 0){
basevalues.privatefunds=privatefundsval + accountval;
basevalues.accountbalance=0;
basevalues.repayamount=accountval;
}else{
basevalues.privatefunds=0;
basevalues.accountbalance=privatefundsval + accountval;
basevalues.repayamount=privatefundsval;
}
}else if(accounttypeval == "overdue_loan" && privatefundsval > 0){
if(privatefundsval + accountval >= 0){
basevalues.privatefunds=privatefundsval + accountval;
basevalues.accountbalance=0;
basevalues.repayamount=Math.abs(accountval);
}else{
basevalues.privatefunds=0;
basevalues.accountbalance=privatefundsval + accountval;
basevalues.repayamount=privatefundsval;
}
}else if(accounttypeval == "mep_loan_percent" && privatefundsval > 0){
if(privatefundsval + accountval >= 0){
basevalues.privatefunds=privatefundsval + accountval;
basevalues.accountbalance=0;
basevalues.repayamount=accountval;
}else{
basevalues.privatefunds=0;
basevalues.accountbalance=privatefundsval + accountval;
basevalues.repayamount=privatefundsval;
}
}else if(accounttypeval == "mep_loan" && privatefundsval > 0){
if(privatefundsval + accountval >= 0){
basevalues.privatefunds=privatefundsval + accountval;
basevalues.accountbalance=0;
basevalues.repayamount=accountval;
}else{
basevalues.privatefunds=0;
basevalues.accountbalance=privatefundsval + accountval;
basevalues.repayamount=privatefundsval;
}
}else if(accounttypeval == "loan_percent" && privatefundsval > 0){
if(privatefundsval + accountval >= 0){
basevalues.privatefunds=privatefundsval + accountval;
basevalues.accountbalance=0;
basevalues.repayamount=accountval;
}else{
basevalues.privatefunds=0;
basevalues.accountbalance=privatefundsval + accountval;
basevalues.repayamount=privatefundsval;
}
}else if(accounttypeval == "reserve" && privatefundsval > 0){
if(privatefundsval + accountval >= 0){
basevalues.privatefunds=privatefundsval + accountval;
basevalues.accountbalance=0;
basevalues.repayamount=accountval;
}else{
basevalues.privatefunds=0;
basevalues.accountbalance=privatefundsval + accountval;
basevalues.repayamount=privatefundsval;
}
}else if(accounttypeval == "potential_debt" && privatefundsval > 0){
if(privatefundsval + accountval >= 0){
basevalues.privatefunds=privatefundsval + accountval;
basevalues.accountbalance=0;
basevalues.repayamount=accountval;
}else{
basevalues.privatefunds=0;
basevalues.accountbalance=privatefundsval + accountval;
basevalues.repayamount=privatefundsval;
}
}else if(accounttypeval == "loanacc_prev" && privatefundsval > 0){
if(privatefundsval + accountval >= 0){
basevalues.privatefunds=privatefundsval + accountval;
basevalues.accountbalance=0;
basevalues.repayamount=Math.abs(accountval);
}else{
basevalues.privatefunds=0;
basevalues.accountbalance=privatefundsval + accountval;
basevalues.repayamount=privatefundsval;
}
}else if(accounttypeval == "loanacc_cur"){
if(privatefundsval + accountval >= 0){
basevalues.privatefunds=privatefundsval + accountval;
basevalues.accountbalance=0;
basevalues.repayamount=Math.abs(accountval);
}else{
basevalues.privatefunds=0;
basevalues.accountbalance=privatefundsval + accountval;
basevalues.repayamount=privatefundsval;
}
}else{
basevalues.privatefunds=privatefundsval;
basevalues.accountbalance=accountval;
basevalues.repayamount=0;
}
result=basevalues;
return result;
}
function accruinginterest(accountbalanceval,rateval){
var result=0;
result=accountbalanceval * rateval / 360;
return result;
}
function eom_procedure(fullbasevalues){
var result=0;
var fullbasevalres={"currday": 0, "cardacc": 0, "privatefunds": 0, "tmpprivatfunds": 0, "loanacc": 0, "loanacc_cur": 0, "loanacc_prev": 0, "notaccruedinterest_cur": 0, "notaccruedinterest_prev": 0, "reserveacc": 0, "loan_percent": 0, "mep_loan": 0, "mep_loan_percent": 0, "mep_potential_interest": 0, "notusedlimit": 0, "overdue_percent": 0, "overdue_loan": 0, "overdue_days": 0, "peny": 0, "ovdcomiss": 0, "usedamount": 0, "reserveamount": 0, "minpayment": 0, "avlamount": 0, "ta_repayamtval": 0};
if(fullbasevalues.currday == 30){
var notaccruedinterest=0;
var overdueinterest=0;
var fullprincdebt=0;
var fullprincdebt10=0;
if(fullbasevalues.overdue_days >= 30){
fullbasevalres.overdue_percent=fullbasevalues.overdue_percent + fullbasevalues.loan_percent;
fullbasevalres.loan_percent=0;
fullbasevalres.loanacc=fullbasevalues.loanacc_prev + fullbasevalues.loanacc_cur + fullbasevalues.overdue_loan;
fullbasevalres.overdue_loan=fullbasevalues.loanacc;
fullbasevalues.loanacc_cur=0;
fullbasevalues.loanacc_prev=0;
fullbasevalres.ovdcomiss=fullbasevalues.ovdcomiss;
fullbasevalres.mep_potential_interest=0;
fullbasevalres.mep_loan_percent=0;
fullbasevalues.mep_loan=0;
}else{
fullbasevalres.overdue_percent=fullbasevalues.overdue_percent + fullbasevalues.mep_potential_interest + fullbasevalues.mep_loan_percent;
fullbasevalres.overdue_loan=fullbasevalues.overdue_loan + fullbasevalues.mep_loan;
fullbasevalres.loanacc=fullbasevalues.loanacc_prev + fullbasevalues.loanacc_cur + fullbasevalues.overdue_loan;
fullbasevalres.loanacc_cur=0;
fullbasevalres.loanacc_prev=fullbasevalues.loanacc_prev + fullbasevalues.loanacc_cur - fullbasevalues.mep_loan;
fullbasevalres.notaccruedinterest_cur=0;
fullbasevalres.notaccruedinterest_prev=fullbasevalues.notaccruedinterest_cur + fullbasevalues.notaccruedinterest_prev + fullbasevalues.reserveacc;
fullbasevalres.reserveacc=0;
fullbasevalres.mep_potential_interest=fullbasevalues.notaccruedinterest_prev + fullbasevalues.reserveacc;
fullbasevalres.ovdcomiss=0;
overdueinterest=fullbasevalues.overdue_percent + fullbasevalues.mep_potential_interest - fullbasevalues.mep_loan_percent;
total_mep=fullbasevalues.mep_loan + fullbasevalues.mep_loan_percent + fullbasevalues.mep_potential_interest;
if(total_mep < 0){
fullbasevalres.overdue_percent=fullbasevalues.mep_potential_interest + fullbasevalues.loan_percent;
fullbasevalres.loan_percent=fullbasevalues.loan_percent + fullbasevalues.notaccruedinterest_cur + fullbasevalues.notaccruedinterest_prev - fullbasevalues.mep_potential_interest + fullbasevalues.reserveacc;
fullbasevalres.mep_loan_percent=fullbasevalues.loan_percent + fullbasevalues.notaccruedinterest_cur + fullbasevalues.notaccruedinterest_prev - fullbasevalues.mep_potential_interest + fullbasevalues.reserveacc;
fullbasevalres.notaccruedinterest_prev=0;
fullbasevalres.overdue_percent=fullbasevalues.mep_loan_percent + fullbasevalues.mep_potential_interest;
fullbasevalres.mep_potential_interest=0;
fullbasevalres.ovdcomiss=-5;
}else{
fullbasevalres.mep_loan_percent=fullbasevalues.loan_percent;
}
notaccruedinterest=fullbasevalues.notaccruedinterest_cur + fullbasevalues.notaccruedinterest_prev + fullbasevalues.reserveacc;
fullprincdebt=fullbasevalues.loanacc_prev + fullbasevalues.loanacc_cur - fullbasevalues.mep_loan;
fullprincdebt10=fullprincdebt * 0.1;
if(notaccruedinterest + fullprincdebt > -25){
fullbasevalres.mep_loan=fullprincdebt;
fullbasevalres.mep_loan_percent=fullprincdebt10 + fullbasevalues.reserveacc;
}else if(notaccruedinterest + fullprincdebt10 > -25){
fullbasevalres.mep_loan_percent=fullprincdebt10 + fullbasevalues.reserveacc;
fullbasevalres.mep_loan=-25 - notaccruedinterest;
}else{
if(overdueinterest + fullbasevalres.loan_percent < 0){
fullbasevalres.mep_potential_interest=0;
fullbasevalres.mep_loan=fullprincdebt10 - (fullbasevalues.notaccruedinterest_cur + fullbasevalues.notaccruedinterest_prev - fullbasevalues.mep_loan_percent + fullbasevalues.reserveacc);
}else{
fullbasevalres.mep_potential_interest=fullbasevalues.notaccruedinterest_cur + fullbasevalues.notaccruedinterest_prev - fullbasevalues.mep_loan_percent + fullbasevalues.reserveacc;
fullbasevalres.mep_loan=fullprincdebt10 - (fullbasevalues.notaccruedinterest_cur + fullbasevalues.notaccruedinterest_prev - fullbasevalues.mep_loan_percent + fullbasevalues.loan_percent + fullbasevalues.reserveacc);
}
}
}
}else{
fullbasevalres.overdue_percent=fullbasevalues.overdue_percent;
fullbasevalres.overdue_loan=fullbasevalues.overdue_loan;
fullbasevalres.mep_loan_percent=fullbasevalues.mep_loan_percent;
fullbasevalres.mep_loan=fullbasevalues.mep_loan;
fullbasevalres.notaccruedinterest_prev=fullbasevalues.notaccruedinterest_prev;
fullbasevalres.notaccruedinterest_cur=fullbasevalues.notaccruedinterest_cur;
fullbasevalres.loan_percent=loan_percent;
fullbasevalres.reserveacc=reserveacc;
fullbasevalres.mep_potential_interest=mep_potential_interest;
fullbasevalres.loanacc_prev=fullbasevalues.loanacc_prev;
fullbasevalres.loanacc_cur=fullbasevalues.loanacc_cur;
fullbasevalres.loanacc=fullbasevalues.loanacc;
fullbasevalres.ovdcomiss=fullbasevalues.ovdcomiss;
}
result=fullbasevalres;
return result;
}
function calculate(){
var result=0;
var currrow=0;
currrow=61;
rind_currday=3;
rind_cardacc=7;
rind_privatefunds=8;
rind_loanacc=9;
rind_loanacc_cur=10;
rind_loanacc_prev=11;
rind_notaccruedinterest_cur=12;
rind_notaccruedinterest_prev=13;
rind_reserveacc=15;
rind_loan_percent=16;
rind_mep_loan=17;
rind_mep_loan_percent=18;
rind_mep_potential_interest=19;
rind_notusedlimit=25;
rind_overdue_percent=20;
rind_overdue_loan=21;
rind_peny=22;
rind_ovdcomiss=23;
rind_overdue_days=24;
rind_fulldebt=29;
rind_usedamount=30;
rind_reserveamount=31;
rind_minpayment=32;
rind_minpayment_main=33;
rind_minpayment_potential=34;
rind_minpayment_persent=35;
rind_minpayment_peny=36;
rind_interestfreepayment=37;
rind_avlamount=38;
var basevalues={"privatefunds": 0, "accountbalance": 0, "repayamount": 0};
var fullbasevalues={"currday": 0, "cardacc": 0, "privatefunds": 0, "tmpprivatfunds": 0, "loanacc": 0, "loanacc_cur": 0, "loanacc_prev": 0, "notaccruedinterest_cur": 0, "notaccruedinterest_prev": 0, "reserveacc": 0, "loan_percent": 0, "mep_loan": 0, "mep_loan_percent": 0, "mep_potential_interest": 0, "notusedlimit": 0, "overdue_percent": 0, "overdue_loan": 0, "overdue_days": 0, "peny": 0, "ovdcomiss": 0, "usedamount": 0, "reserveamount": 0, "minpayment": 0, "avlamount": 0, "ta_repayamtval": 0};
var fullbaseresult={"currday": 0, "cardacc": 0, "privatefunds": 0, "tmpprivatfunds": 0, "loanacc": 0, "loanacc_cur": 0, "loanacc_prev": 0, "notaccruedinterest_cur": 0, "notaccruedinterest_prev": 0, "reserveacc": 0, "loan_percent": 0, "mep_loan": 0, "mep_loan_percent": 0, "mep_potential_interest": 0, "notusedlimit": 0, "overdue_percent": 0, "overdue_loan": 0, "overdue_days": 0, "peny": 0, "ovdcomiss": 0, "usedamount": 0, "reserveamount": 0, "minpayment": 0, "avlamount": 0, "ta_repayamtval": 0};
for(icol=2;icol<=271;icol++){
if(icol == currrow){
icol=currrow;
}
currday=getcurrdayvalue(rind_currday, icol);
cardacc=getcurrdayvalue(rind_cardacc, icol);
privatefunds=getprevdayvalue(rind_privatefunds, icol);
loanacc=getprevdayvalue(rind_loanacc, icol);
loanacc_cur=getprevdayvalue(rind_loanacc_cur, icol);
loanacc_prev=getprevdayvalue(rind_loanacc_prev, icol);
notaccruedinterest_cur=getprevdayvalue(rind_notaccruedinterest_cur, icol);
notaccruedinterest_prev=getprevdayvalue(rind_notaccruedinterest_prev, icol);
reserveacc=getprevdayvalue(rind_reserveacc, icol);
mep_potential_interest=getprevdayvalue(rind_mep_potential_interest, icol);
loan_percent=getprevdayvalue(rind_loan_percent, icol);
mep_loan=getprevdayvalue(rind_mep_loan, icol);
mep_loan_percent=getprevdayvalue(rind_mep_loan_percent, icol);
ovdcomiss=getprevdayvalue(rind_ovdcomiss, icol);
if(icol == 2){
notusedlimit=currentSettings.limit;
}else{
notusedlimit=getprevdayvalue(rind_notusedlimit, icol);
}
overdue_percent=getprevdayvalue(rind_overdue_percent, icol);
overdue_loan=getprevdayvalue(rind_overdue_loan, icol);
peny=getprevdayvalue(rind_peny, icol);
overdue_days=getprevdayvalue(rind_overdue_days, icol);
usedamount=getprevdayvalue(rind_usedamount, icol);
minpayment=getprevdayvalue(rind_minpayment, icol);
avlamount=getprevdayvalue(rind_avlamount, icol);
basevalues=card2privatetransfer(cardacc, privatefunds);
privatefunds=basevalues.privatefunds;
cells[rind_privatefunds][icol]=round(privatefunds, 2);
if(icol == currrow){
icol=currrow;
}
basevalues=private2accounttransfer(privatefunds, ovdcomiss, "ovdcomiss");
privatefunds=basevalues.privatefunds;
ovdcomiss=basevalues.accountbalance;
cells[rind_privatefunds][icol]=round(privatefunds, 2);
cells[rind_ovdcomiss][icol]=round(ovdcomiss, 2);
if(icol == currrow){
icol=currrow;
}
basevalues=private2accounttransfer(privatefunds, peny, "peny");
privatefunds=basevalues.privatefunds;
peny=basevalues.accountbalance;
cells[rind_privatefunds][icol]=round(privatefunds, 2);
cells[rind_peny][icol]=round(peny, 2);
if(icol == currrow){
icol=currrow;
}
basevalues=private2accounttransfer(privatefunds, overdue_percent, "overdue_percent");
privatefunds=basevalues.privatefunds;
overdue_percent=basevalues.accountbalance;
cells[rind_privatefunds][icol]=round(privatefunds, 2);
cells[rind_overdue_percent][icol]=round(overdue_percent, 2);
if(icol == currrow){
icol=currrow;
}
basevalues=private2accounttransfer(privatefunds, overdue_loan, "overdue_loan");
privatefunds=basevalues.privatefunds;
overdue_loan=basevalues.accountbalance;
loanacc=loanacc + basevalues.repayamount;
cells[rind_privatefunds][icol]=round(privatefunds, 2);
cells[rind_overdue_loan][icol]=round(overdue_loan, 2);
cells[rind_loanacc][icol]=round(loanacc, 2);
if(icol == currrow){
icol=currrow;
}
basevalues=private2accounttransfer(privatefunds, mep_potential_interest, "mep_potential_interest");
privatefunds=basevalues.privatefunds;
mep_potential_interest=basevalues.accountbalance;
reserveacc=reserveacc + basevalues.repayamount;
cells[rind_privatefunds][icol]=round(privatefunds, 2);
cells[rind_mep_loan_percent][icol]=round(mep_loan_percent, 2);
cells[rind_reserveacc][icol]=round(reserveacc, 2);
cells[rind_mep_potential_interest][icol]=round(mep_potential_interest, 2);
if(icol == currrow){
icol=currrow;
}
basevalues=private2accounttransfer(privatefunds, mep_loan_percent, "mep_loan_percent");
privatefunds=basevalues.privatefunds;
mep_loan_percent=basevalues.accountbalance;
if(loan_percent + Math.abs(basevalues.repayamount) > 0){
loan_percent=0;
}else{
loan_percent=loan_percent + Math.abs(basevalues.repayamount);
}
if(overdue_days > 0){
mep_potential_interest=0;
reserveacc=0;
}else{
if(mep_potential_interest < 0){
if(mep_potential_interest + Math.abs(basevalues.repayamount) >= 0){
reserveacc=reserveacc + Math.abs(mep_potential_interest);
mep_potential_interest=0;
}else{
reserveacc=reserveacc + Math.abs(basevalues.repayamount);
mep_potential_interest=mep_potential_interest + Math.abs(basevalues.repayamount);
}
}
}
cells[rind_privatefunds][icol]=round(privatefunds, 2);
cells[rind_mep_loan_percent][icol]=round(mep_loan_percent, 2);
cells[rind_reserveacc][icol]=round(reserveacc, 2);
cells[rind_mep_potential_interest][icol]=round(mep_potential_interest, 2);
cells[rind_reserveacc][icol]=round(reserveacc, 2);
cells[rind_loan_percent][icol]=round(loan_percent, 2);
if(icol == currrow){
icol=currrow;
}
basevalues=private2accounttransfer(privatefunds, mep_loan, "mep_loan");
privatefunds=basevalues.privatefunds;
mep_loan=basevalues.accountbalance;
if(basevalues.repayamount < 0){
loanacc_prev=loanacc_prev - basevalues.repayamount;
loanacc=loanacc - basevalues.repayamount;
}else{
loanacc_prev=loanacc_prev + basevalues.repayamount;
loanacc=loanacc + basevalues.repayamount;
}
cells[rind_privatefunds][icol]=round(privatefunds, 2);
cells[rind_mep_loan][icol]=round(mep_loan, 2);
cells[rind_loanacc_prev][icol]=round(loanacc_prev, 2);
cells[rind_loanacc][icol]=round(loanacc, 2);
if(icol == currrow){
icol=currrow;
}
basevalues=private2accounttransfer(privatefunds, loan_percent, "loan_percent");
privatefunds=basevalues.privatefunds;
loan_percent=basevalues.accountbalance;
cells[rind_privatefunds][icol]=round(privatefunds, 2);
cells[rind_loan_percent][icol]=round(loan_percent, 2);
if(icol == currrow){
icol=currrow;
}
if(icol == 114){
icol=114;
}
basevalues=private2accounttransfer(privatefunds, loanacc_prev, "loanacc_prev");
privatefunds=basevalues.privatefunds;
if(basevalues.privatefunds >= 0 && round(basevalues.accountbalance, 2) + reserveacc == 0){
loanacc_prev=basevalues.accountbalance + reserveacc;
loanacc=loanacc + basevalues.repayamount + reserveacc;
notaccruedinterest_prev=0;
privatefunds=privatefunds;
reserveacc=0;
}else{
loanacc_prev=basevalues.accountbalance;
loanacc=loanacc + basevalues.repayamount;
}
if(loanacc_prev == 0){
privatefunds=privatefunds + reserveacc;
reserveacc=0;
notaccruedinterest_prev=0;
}
cells[rind_privatefunds][icol]=round(privatefunds, 2);
cells[rind_loanacc_prev][icol]=round(loanacc_prev, 2);
cells[rind_loanacc][icol]=round(loanacc, 2);
cells[rind_notaccruedinterest_prev][icol]=round(notaccruedinterest_prev, 2);
if(icol == currrow){
icol=currrow;
}
if(icol == currrow){
icol=currrow;
}
basevalues=private2accounttransfer(privatefunds, loanacc_cur, "loanacc_cur");
privatefunds=basevalues.privatefunds;
loanacc_cur=basevalues.accountbalance;
loanacc=loanacc + basevalues.repayamount;
if(loanacc_prev == reserveacc * -1){
loanacc_prev=0;
notaccruedinterest_prev=notaccruedinterest_prev + reserveacc;
loanacc=loanacc + reserveacc;
reserveacc=0;
cells[rind_notaccruedinterest_prev][icol]=round(notaccruedinterest_prev, 2);
cells[rind_reserveacc][icol]=round(reserveacc, 2);
}
cells[rind_privatefunds][icol]=round(privatefunds, 2);
cells[rind_loanacc_cur][icol]=round(loanacc_cur, 2);
cells[rind_loanacc][icol]=round(loanacc, 2);
if(loanacc_cur == 0){
notaccruedinterest_cur=0;
cells[rind_notaccruedinterest_cur][icol]=round(notaccruedinterest_cur, 2);
}
if(icol == currrow){
icol=currrow;
}
if(reserveacc + loanacc_prev >= 0 && loanacc < 0){
privatefunds=reserveacc + loanacc_prev;
notaccruedinterest_prev=0;
loanacc_prev=0;
reserveacc=0;
cells[rind_privatefunds][icol]=round(privatefunds, 2);
cells[rind_loanacc_prev][icol]=round(loanacc_prev, 2);
cells[rind_loanacc][icol]=round(loanacc, 2);
cells[rind_notaccruedinterest_prev][icol]=round(notaccruedinterest_prev, 2);
cells[rind_reserveacc][icol]=round(reserveacc, 2);
}
if(icol == currrow){
icol=currrow;
}
basevalues=private2accounttransfer(privatefunds, loanacc_cur, "loanacc_cur");
privatefunds=basevalues.privatefunds;
loanacc_cur=basevalues.accountbalance;
loanacc=loanacc + basevalues.repayamount;
if(loanacc_prev == reserveacc * -1){
loanacc_prev=0;
notaccruedinterest_prev=notaccruedinterest_prev + reserveacc;
loanacc=loanacc + reserveacc;
reserveacc=0;
cells[rind_notaccruedinterest_prev][icol]=round(notaccruedinterest_prev, 2);
cells[rind_reserveacc][icol]=round(reserveacc, 2);
}
cells[rind_privatefunds][icol]=round(privatefunds, 2);
cells[rind_loanacc_cur][icol]=round(loanacc_cur, 2);
cells[rind_loanacc][icol]=round(loanacc, 2);
if(loanacc_cur == 0){
notaccruedinterest_cur=0;
cells[rind_notaccruedinterest_cur][icol]=round(notaccruedinterest_cur, 2);
}
if(icol == currrow){
icol=currrow;
}
notaccruedinterest_cur=notaccruedinterest_cur + accruinginterest(loanacc_cur, currentSettings.rate/100);
if(overdue_days == 0){
notaccruedinterest_prev=notaccruedinterest_prev + accruinginterest(loanacc_prev, currentSettings.rate/100);
}else{
notaccruedinterest_prev=0;
if(overdue_loan + overdue_percent != 0){
loan_percent=loan_percent + mep_potential_interest + reserveacc + accruinginterest(loanacc_prev, currentSettings.rate/100);
}
mep_potential_interest=0;
}
peny=peny + accruinginterest(overdue_loan, currentSettings.penalty/100);
cells[rind_notaccruedinterest_cur][icol]=round(notaccruedinterest_cur, 2);
cells[rind_notaccruedinterest_prev][icol]=round(notaccruedinterest_prev, 2);
cells[rind_mep_potential_interest][icol]=round(mep_potential_interest, 2);
cells[rind_loan_percent][icol]=round(loan_percent, 2);
cells[rind_peny][icol]=round(peny, 2);
fullbasevalues.currday=currday;
fullbasevalues.overdue_days=overdue_days;
fullbasevalues.overdue_percent=overdue_percent;
fullbasevalues.overdue_loan=overdue_loan;
fullbasevalues.mep_loan_percent=mep_loan_percent;
fullbasevalues.mep_loan=mep_loan;
fullbasevalues.notaccruedinterest_prev=notaccruedinterest_prev;
fullbasevalues.notaccruedinterest_cur=notaccruedinterest_cur;
fullbasevalues.reserveacc=reserveacc;
fullbasevalues.mep_potential_interest=mep_potential_interest;
fullbasevalues.loan_percent=loan_percent;
fullbasevalues.loanacc_prev=loanacc_prev;
fullbasevalues.loanacc_cur=loanacc_cur;
fullbasevalues.loanacc=loanacc;
fullbasevalues.ovdcomiss=ovdcomiss;
if(icol == currrow){
icol=currrow;
}
fullbaseresult=eom_procedure(fullbasevalues);
overdue_percent=fullbaseresult.overdue_percent;
overdue_loan=fullbaseresult.overdue_loan;
mep_loan_percent=fullbaseresult.mep_loan_percent;
mep_loan=fullbaseresult.mep_loan;
notaccruedinterest_prev=fullbaseresult.notaccruedinterest_prev;
notaccruedinterest_cur=fullbaseresult.notaccruedinterest_cur;
reserveacc=fullbaseresult.reserveacc;
mep_potential_interest=fullbaseresult.mep_potential_interest;
loan_percent=fullbaseresult.loan_percent;
loanacc_prev=fullbaseresult.loanacc_prev;
loanacc_cur=fullbaseresult.loanacc_cur;
loanacc=fullbaseresult.loanacc;
ovdcomiss=fullbaseresult.ovdcomiss;
if(overdue_days > 0){
mep_potential_interest=0;
reserveacc=0;
}
cells[rind_loanacc][icol]=round(loanacc, 2);
cells[rind_loanacc_cur][icol]=round(loanacc_cur, 2);
cells[rind_loanacc_prev][icol]=round(loanacc_prev, 2);
cells[rind_notaccruedinterest_cur][icol]=round(notaccruedinterest_cur, 2);
cells[rind_notaccruedinterest_prev][icol]=round(notaccruedinterest_prev, 2);
cells[rind_mep_loan][icol]=round(mep_loan, 2);
cells[rind_mep_loan_percent][icol]=round(mep_loan_percent, 2);
cells[rind_reserveacc][icol]=round(reserveacc, 2);
cells[rind_mep_potential_interest][icol]=round(mep_potential_interest, 2);
cells[rind_loan_percent][icol]=round(loan_percent, 2);
cells[rind_overdue_percent][icol]=round(overdue_percent, 2);
cells[rind_overdue_loan][icol]=round(overdue_loan, 2);
cells[rind_ovdcomiss][icol]=round(ovdcomiss, 2);
if(notusedlimit != 0){
notusedlimit=currentSettings.limit + loanacc;
}
if(notusedlimit > currentSettings.limit){
notusedlimit=currentSettings.limit;
}else if(overdue_days >= 30){
notusedlimit=0;
}else if(notusedlimit < 0){
notusedlimit=0;
}
cells[rind_notusedlimit][icol]=round(notusedlimit, 2);
if(icol == 61){
icol=61;
}
usedamount=loanacc_cur + loanacc_prev + overdue_loan;
cells[rind_usedamount][icol]=round(usedamount, 2);
reserveamount=reserveacc;
cells[rind_reserveamount][icol]=round(reserveamount, 2);
if(icol == 91){
icol=91;
}
if(overdue_days >= 30){
minpayment=fulldebt;
}else{
minpayment=mep_loan + mep_potential_interest + mep_loan_percent + overdue_loan + overdue_percent + peny + ovdcomiss;
}
minpayment_main=mep_loan + overdue_loan;
minpayment_potential=mep_potential_interest;
minpayment_persent=mep_loan_percent + overdue_percent;
minpayment_peny=peny + ovdcomiss;
cells[rind_minpayment][icol]=round(minpayment, 2);
cells[rind_minpayment_main][icol]=round(minpayment_main, 2);
cells[rind_minpayment_potential][icol]=round(minpayment_potential, 2);
cells[rind_minpayment_persent][icol]=round(minpayment_persent, 2);
cells[rind_minpayment_peny][icol]=round(minpayment_peny, 2);
if((overdue_loan + overdue_percent + peny) < 0){
overdue_days=overdue_days + 1;
if(overdue_days >= 30){
notusedlimit=0;
}
mep_potential_interest=0;
}else{
overdue_days=0;
}
cells[rind_overdue_days][icol]=round(overdue_days, 2);
fulldebt=loanacc + reserveacc + loan_percent + overdue_percent + peny + ovdcomiss;
cells[rind_fulldebt][icol]=round(fulldebt, 2);
interestfreepayment=0;
cells[rind_interestfreepayment][icol]=round(interestfreepayment, 2);
if(overdue_loan + overdue_percent == 0){
interestfreepayment=loanacc_prev + reserveacc;
}else{
interestfreepayment=0;
}
cells[rind_interestfreepayment][icol]=round(interestfreepayment, 2);
if(overdue_days == 0){
avlamount=notusedlimit;
}else{
avlamount=0;
}
cells[rind_avlamount][icol]=round(avlamount, 2);
}
return result;
}
function private2accounttransfer(f,a,t){const r=transferCore(f,a,t);if(f>0&&a<0&&Math.abs(r.repayamount)>0){allocations[icol].push({type:t,amount:round(Math.abs(r.repayamount),2)});}return r;}
function simulate(ops,settings={limit:10000,rate:24,penalty:36}){
 currentSettings=settings;cells=Array.from({length:42},()=>Array(272).fill(0));allocations=Array.from({length:272},()=>[]);
currday=0;cardacc=0;privatefunds=0;tmpprivatfunds=0;loanacc=0;loanacc_cur=0;loanacc_prev=0;notaccruedinterest_cur=0;notaccruedinterest_prev=0;reserveacc=0;loan_percent=0;mep_loan=0;mep_loan_percent=0;mep_potential_interest=0;notusedlimit=0;overdue_percent=0;overdue_loan=0;overdue_days=0;peny=0;ovdcomiss=0;fulldebt=0;usedamount=0;reserveamount=0;minpayment=0;minpayment_main=0;minpayment_potential=0;minpayment_persent=0;minpayment_peny=0;interestfreepayment=0;avlamount=0;rind_currday=0;rind_cardacc=0;rind_privatfunds=0;rind_loanacc=0;rind_loanacc_cur=0;rind_loanacc_prev=0;rind_notaccruedinterest_cur=0;rind_notaccruedinterest_prev=0;rind_reserveacc=0;rind_loan_percent=0;rind_mep_loan=0;rind_mep_loan_percent=0;rind_mep_potential_interest=0;rind_notusedlimit=0;rind_overdue_percent=0;rind_overdue_loan=0;rind_overdue_days=0;rind_peny=0;rind_ovdcomiss=0;rind_fulldebt=0;rind_usedamount=0;rind_reserveamount=0;rind_minpayment=0;rind_minpayment_main=0;rind_minpayment_potential=0;rind_minpayment_persent=0;rind_minpayment_peny=0;rind_interestfreepayment=0;rind_avlamount=0;

 for(let c=2;c<=271;c++){cells[3][c]=(c-2)%30+1;}
 for(const o of ops){cells[7][o.day+1]+=o.amount;}
 calculate();return Array.from({length:270},(_,i)=>({day:i+1,values:cells.map(r=>r[i+2]),allocations:allocations[i+2]}));
}
if(typeof module!=='undefined')module.exports={simulate,round};
