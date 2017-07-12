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
