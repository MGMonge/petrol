import "colors";
import PrettyError from 'pretty-error';

let pe = new PrettyError;

pe.appendStyle({
    'pretty-error > trace > item' : {marginBottom: 0}
});

if (petrol.verbose == 1) {
    pe.skipPackage('petrol', 'jasmine', 'jasmine-core', 'vue');
}

if (petrol.verbose > 1) {
    Error.stackTraceLimit = Infinity;
}

module.exports = {
    total: 0,
    passed: 0,
    executed: 0,
    failures: [],
    lastSpecStartedAt: null,
    currentSuite: null,
    ranTests: [],

    jasmineStarted(suiteInfo) {
        this.total = suiteInfo.totalSpecsDefined;
        console.log(this.displaySuiteTitle(`Tests (${suiteInfo.totalSpecsDefined})`));
        console.log(``);
    },

    suiteStarted(result) {
        this.currentSuite = result.id;
        this.ranTests[this.currentSuite] = [];
        console.log(` ${result.fullName.bold}`);
    },

    suiteDone() {
        if (this.ranTests[this.currentSuite].length === 0) {
            console.log(`  No tests executed!`.yellow);
        }

        console.log(``);
    },

    displaySuiteTitle(string) {
        return `${string} ${'-'.repeat(process.stdout.columns - string.length - 2)}`.bold;
    },

    displaySpecTitle(string) {
        string = string.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
        string = string.charAt(0).toUpperCase() + string.slice(1);

        return string.replace(/__/g, '_').replace(/_/g, ' ');
    },

    specStarted() {
        this.lastSpecStartedAt = new Date;
    },

    specDone(result) {
        this.executed++;
        this.ranTests[this.currentSuite].push(result.id)

        if (result.status === 'passed') {

            let seconds = this.secondsFrom(this.lastSpecStartedAt);

            console.log(`   ${'✔'.green.bold} ${this.displaySpecTitle(result.description)} ` + `(${seconds}ms)`.gray);
            this.passed++;
        }

        if (result.status === 'failed') {
            console.log(`   ✖ ${this.displaySpecTitle(result.description)}`.bold.red);
        }

        if (result.failedExpectations.length > 0) {
            this.failures.push({
                test: result.fullName,
                error: result.failedExpectations[0],
            });

            if (petrol.stopOnFailure) {
                this.jasmineDone();
                process.exit();
            }
        }
    },

    secondsFrom(start) {
        return (new Date - start) / 1000;
    },

    renderError(error) {
        let message = error.message;

        if (petrol.verbose) {
            console.log(pe.render(error));
        } else {
            console.log(`${message}\n`.bold);
        }
    },

    jasmineDone() {

        console.log('-'.bold.repeat(process.stdout.columns - 1));

        if (this.failures.length > 0) {
            console.log(`\n${this.failures.length} Failing test${this.failures.length > 1 ? 's' : ''}\n`.bold.red);
        }

        for (let i = 0; i < this.failures.length; i++) {
            console.log(`${i + 1}) ${this.failures[i].test.yellow}`);

            this.renderError(this.failures[i].error)

            if (petrol.stopOnFailure) {
                break;
            }
        }

        let seconds = this.secondsFrom(global.__started_at);

        console.log(`\nTime: ${seconds} seconds\n`);

        if (this.total == 0) {
            console.log(`No tests executed!`.black.bgYellow);
            process.exit();
        }

        if (this.failures.length > 0) {
            console.log(`OK (${this.executed} tests, ${this.passed} passing, ${this.failures.length} failing)`.bgRed);
        } else {
            console.log(`OK (${this.executed} tests, ${this.passed} passing)`.black.bgGreen);
        }
    }
}