const React = require("react");
const { Localized } = require("fluent-react/compat");
// l10n TODO: do we need to have strings here? Or just in the view
// that eventually renders the <Localized> components?

exports.TimeDiff = class TimeDiff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {useLocalTime: false};
  }

  render() {
    let timeDiff;
    if (this.state.useLocalTime) {
      timeDiff = this.makeDiffString(this.props.date);
    } else {
      timeDiff = this.dateString(this.props.date);
    }
    return <Localized id={timeDiff.l10nID} $number={timeDiff.diff}><span title={this.dateString(this.props.date)}></span></Localized>
  }

  componentDidMount() {
    if (typeof window !== "undefined" && !this.state.useLocalTime) {
      setTimeout(() => {
        this.setState({useLocalTime: true});
      });
    }
  }

  makeDiffString(d) {
    let timeDiff;
    let l10nID;
    let seconds = (Date.now() - d) / 1000;
    if (seconds > 0) {
      if (seconds < 20) {
        l10nID = "timeDiffJustNow";
      } else if (seconds > 0 && seconds < 60) {
        l10nID = "timeDiffOneMinuteAgo";
      } else if (seconds < 60 * 60) {
        l10nID = 'timeDiffMinutesAgo';
        timeDiff = Math.floor(seconds / 60);
      } else if (seconds > 60 * 60 && seconds < 60 * 60 * 2) {
        l10nID = "timeDiffOneHourAgo";
      } else if (seconds < 60 * 60 * 24) {
        l10nID = "timeDiffHoursAgo";
        timeDiff = Math.floor(seconds / (60 * 60));
      } else if (seconds < 60 * 60 * 48) {
        l10nID = "timeDiffYesterday";
      } else if (seconds > 0) {
        l10nID = "timeDiffDaysAgo";
        seconds += 60 * 60 * 2; // 2 hours fudge time
        timeDiff = Math.floor(seconds / (60 * 60 * 24));
      }
    } else if (seconds > -20) {
      l10nID = "timeDiffFutureSeconds";
    } else if (seconds > -60) {
      l10nID = "timeDiffFutureOneMinute";
    } else if (seconds > -60 * 60) {
      l10nID = "timeDiffFutureMinutes";
      timeDiff = Math.floor(seconds / -60);
    } else if (seconds < -60 * 60 && seconds > -60 * 60 * 2) {
      l10nID = "timeDiffFutureOneHour";
    } else if (seconds > -60 * 60 * 24) {
      l10nID = "timeDiffFutureHours";
      timeDiff = Math.floor(seconds / (-60 * 60));
    } else if (seconds > -60 * 60 * 48) {
      l10nID = "timeDiffFutureTomorrow";
    } else {
      seconds -= 60 * 60 * 2; // 2 hours fudge time
      l10nID = "timeDiffFutureDays";
      timeDiff = Math.floor(seconds / (-60 * 60 * 24));
    }
    return {diff: timeDiff, l10nID};
  }

  dateString(d) {
    if (!(d instanceof Date)) {
      d = new Date(d);
    }
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric' };
    // TODO get the user's locale in here
    return d.toLocaleString('en-US', options); // ie: "Dec 20, 2012, 3 AM"
  }
};


exports.intervalDescription = function(ms) {
  let parts = [];
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;
  if (ms > day) {
    let days = Math.floor(ms / day);
    if (days === 1) {
      parts.push("1 day");
    } else {
      parts.push(`${days} days`);
    }
    ms = ms % day;
  }
  if (ms > hour) {
    let hours = Math.floor(ms / hour);
    if (hours === 1) {
      parts.push("1 hour");
    } else {
      parts.push(`${hours} hours`);
    }
    ms = ms % hour;
  }
  if (ms > minute) {
    let minutes = Math.floor(ms / minute);
    if (minutes === 1) {
      parts.push("1 minute");
    } else {
      parts.push(`${minutes} minutes`);
    }
    ms = ms % minute;
  }
  if (ms) {
    let seconds = Math.floor(ms / second);
    if (seconds === 1) {
      parts.push("1 second");
    } else {
      parts.push(`${seconds} seconds`);
    }
  }
  if (!parts.length) {
    parts.push("immediately");
  }
  return parts.join(" ");
};
