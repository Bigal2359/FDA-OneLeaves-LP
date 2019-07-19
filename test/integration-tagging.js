/*!
 * AARP integration tests
 */
var env = require('./env');

describe('AARP tagging', function() {
  'use strict';

  before(function() {

    global.listener = function(resource, request) {
      global.headers.push(resource);
    };

    casper.on('resource.requested', listener);
  });

  beforeEach(function() {
    var _env = casper.cli.get('env');
    global.headers = [];

    casper.start(env[_env] + '/index.html');
  });

  /*
   *  Floodlight tags
   */
  it('does\'t fires FL tag on page load', function() {
    casper.then(function() {
      var tag = /https?:\/\/3974622.fls.doubleclick.net\/activityi;src=3974622;type=brand396;cat=aarpl186;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1;num=/;
      JSON.stringify(global.headers).should.not.match(tag);
    });
  });

  it('fires FL tag on click "See Member Benefits"', function() {
    var tag = /https?:\/\/3974622.fls.doubleclick.net\/activityi;src=3974622;type=brand396;cat=leadexpa;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1;num=/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.js-toggle-aarp .js-toggle-self');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  it('fires FL tag on click "go to SCAM-tracking Map"', function() {
    var tag = /https?:\/\/3974622.fls.doubleclick.net\/activityi;src=3974622;type=branding;cat=fraud00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1;num=/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.js-toggle-tech .js-toggle-self');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.js-toggle-tech .button__external:nth-of-type(2)');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  it('fires FL tag on click "Enjoy AARP Learn More"', function() {
    var tag = /https?:\/\/3974622.fls.doubleclick.net\/activityi;src=3974622;type=branding;cat=123120/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.js-aarp-now .button__external');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  it('fires FL tag on click "YMAL; Travel Button"', function() {
    var tag = /https?:\/\/3974622.fls.doubleclick.net\/activityi;src=3974622;type=brand396;cat=ytravbut/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.js-toggle-life-reimagined .js-toggle-self');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.js-toggle-life-reimagined .js-toggle-other');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  it('fires FL tag on click "Sweepstakes Enter Now"', function() {
    var tag = /https?:\/\/3974622.fls.doubleclick.net\/activityi;src=3974622;type=branding;cat=12312000/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.js-sweepstakes .button__external');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  it('fires FL tag on click "Sweepstakes Official Rules"', function() {
    var tag = /https?:\/\/3974622.fls.doubleclick.net\/activityi;src=3974622;type=branding;cat=12312001/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.js-sweepstakes .official__rules');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  /*
   *  Omniture tags
   */
  it('fires OM tag on click "See Member Benefits"', function() {
    var tag = /https?:\/\/metrics.aarp.org.+REALPOSS.Link_Member_Benefits_Learn_More/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.js-toggle-aarp .js-toggle-self');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  it('fires OM tag on click "Privacy Policy"', function() {
    var tag = /https?:\/\/metrics.aarp.org.+www.aarp.org%2Fabout-aarp%2Fprivacy-policy/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('footer a:nth-of-type(1)');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  it('fires OM tag on click "Terms of Service"', function() {
    var tag = /https?:\/\/metrics.aarp.org.+www.aarp.org%2Fabout-aarp%2Fterms-of-service/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('footer a:nth-of-type(2)');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  it('fires OM tag on click "Copyright Info"', function() {
    var tag = /https?:\/\/metrics.aarp.org.+www.aarp.org%2Fabout-aarp%2Faarp-website-copyright-information/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('footer a:nth-of-type(3)');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  it('fires OM tag on click "Sweepstakes Enter Now"', function() {
    var tag = /https?:\/\/metrics.aarp.org.+sweeps.aarp.org%2Fenterhealth2016/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.content__sweepstakes .button__external');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  it('fires OM tag on click "Sweepstakes Official Rules"', function() {
    var tag = /https?:\/\/metrics.aarp.org.+sweeps.aarp.org%2Fenterhealth2016%2Frules/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.content__sweepstakes .official__rules');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  it('fires OM tag on click "Become A Member Now"', function() {
    var tag = /appsec%2Fmembership%2Fjoin%2Fstart/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.js-toggle-aarp .js-toggle-self');
      this.click('.button__external');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  it('fires OM tag on click "Become A Member Now - End"', function() {
    var tag = /appsec%2Fmembership%2Fjoin%2Fstart/;
    casper.then(function() {
      JSON.stringify(global.headers).should.not.match(tag);
    });
    casper.then(function() {
      this.click('.js-membership .button__external');
    });
    casper.then(function() {
      JSON.stringify(global.headers).should.match(tag);
    });
  });

  /*it('fires OM tag on click Fraud Video', function() {
    // open -a Google\ Chrome\ Canary --args --disable-web-security --user-data-dir=$HOME/Library/Application\ Support/Google/Chrome\ Canary/
    var tag = /https?:\/\/metrics.aarp.org.+REALPOSS.Link_Fraud_Video_Play/;
    casper.then(function() {
      var video = casper.evaluate(function() {
        var ele = $('.js-toggle-tech .video-wrapper iframe').contents().find('.ytp-thumbnail-overlay');
        return ele.click();
      });
      video;
      casper.wait(3000, function() {
        JSON.stringify(global.headers).should.match(tag);
      });
    });
  });*/

});
