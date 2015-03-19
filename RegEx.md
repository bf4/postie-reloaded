# Purpose #

If you're bouncing emails to postie or otherwise need them filtered to remove email addresses, unsubscribes, and other formatting. It should be moved into the database rather than hard-coded.


# Details #

Here are some that I like
  * `$patterns[] = '/<a\b[^>]*>.*?(ubscribe|eave|rofile|pdate|[Pp]references).*?<\/a>/';`//remove unsubscribe stuff`
  * `$patterns[] = '/<a\b([^>]+)(ubscribe|eave|rofile|pdate|[Pp]references)([^>]+)>.*?<\/a>/si'; //remove unsubscribe stuff`
  * `$patterns[] = '/(http).*?(evite).*?(email)/';  //remove evite`
  * `$patterns[] = '/(href=)?["\']?(http:\S+www\.evite\.com)\S+["\'\b]/';  //evite`
  * `$patterns[] = '/inviteId\S+\b/'; //evite`
  * `$patterns[] = '/iid=\S+\b/'; //evite`
  * `$patterns[] = '/No virus found in this outgoing message\./'; //remove avg stuff`
  * `$patterns[] = '/Checked by AVG\./'; //remove avg stuff`
  * `$patterns[] = '/Version.+?Virus.+?Release.+?AM/'; //remove avg stuff`
  * `$patterns[] = '/No virus found in this incoming message\./'; //remove avg stuff`
  * `$patterns[] = '/<span\b[^>]*>.*(_,_).*(_,_).*<\/span>/si'; //remove yahoo stuff`
  * `$patterns[] = '/user@host.com/'; //your email`