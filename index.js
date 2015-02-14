var CONFIG = require('./config.json');
var ADULT_KEYWORDS = CONFIG.content.validate.adultKeywords;
var ADULT_KEYWORDS_REGEX = new RegExp(ADULT_KEYWORDS.join('|'), 'gim');

function _isExplicitText(tweet) {
  return ADULT_KEYWORDS_REGEX.test(tweet.text);
};

function _isExplicitName(tweet) {
  return ADULT_KEYWORDS_REGEX.test(tweet.user.name);
};

function _isExplicitLocation(tweet) {
  return ADULT_KEYWORDS_REGEX.test(tweet.user.location);
};

function _isExplicitDescription(tweet) {
  return ADULT_KEYWORDS_REGEX.test(tweet.user.description);
};

function isValid(tweet) {
  // This filter has no power
  if (CONFIG.content.with && CONFIG.content.without) {
    return true;
  }

  // This filter blocks everything
  if (!CONFIG.content.with && !CONFIG.content.without) {
    return false;
  }

  // Show only with this content
  if (CONFIG.content.with && !CONFIG.content.without) {
    if (
      _isExplicitText(tweet)
      || _isExplicitName(tweet)
      || _isExplicitLocation(tweet)
      || _isExplicitDescription(tweet)
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Show only without this content
  if (!CONFIG.content.with && CONFIG.content.without) {
    if (
      _isExplicitText(tweet)
      || _isExplicitName(tweet)
      || _isExplicitLocation(tweet)
      || _isExplicitDescription(tweet)
    ) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = {
  isValid: isValid
};
