import styled from 'styled-components'
import {Cell as StickyCell, Row} from 'react-sticky-table'

export const Cell = styled(StickyCell)`
    min-width: 40px;
    width: 5vw;
    height: 1.8em !important;
    text-align: center;
    vertical-align: middle;
    color: ${(props) => (props.winning ? 'green' : '')};
`

export const StatsCell = styled(Cell)`
    color: ${(props) => {
        if (props.winning) return 'green'
        if (props.losing) return 'red'
    }};
`

export const HeaderCell = styled(Cell)`
    font-weight: 700;
    background-color: #046fdb;
    color: #fff;
`

export const RowHeaderCell = styled(HeaderCell)`
    min-width: 120px !important;
    border-right: 1px solid hsl(0, 0%, 95%);
`

export const Sup = styled.div`
    font-size: x-small;
    color: hsl(0, 0%, 50%);
    vertical-align: super;
    padding: 1px;
`

export const RowWrapper = styled(Row)`
    border-bottom: 1px solid hsl(0, 0%, 95%);
    color: ${(props) => (props.doubles && 'white')};
    &:hover {
        background-color: grey !important;
    }
`

export const rowBGColor = (doubles) => {
    switch (doubles) {
        case 'd':
            return '#c1dcf0'
        case 't':
            return '#f7b125'
        case 'q':
            return '#724c9f'
        case 'p':
            return '#008348'
        default:
            break
    }
}

export const hasDoubles = (player) => {
    let count = 0
    const {
        rebounds_defensive,
        rebounds_offensive,
        assists,
        steals,
        blocks,
        points,
    } = player
    count += (+rebounds_offensive + +rebounds_defensive) / 10 >= 1 ? 1 : 0
    count += (+points) / 10 >= 1 ? 1 : 0
    count += (+assists) / 10 >= 1 ? 1 : 0
    count += (+steals) / 10 >= 1 ? 1 : 0
    count += (+blocks) / 10 >= 1 ? 1 : 0
    switch (count) {
        case 2:
            return 'd'
        case 3:
            return 't'
        case 4:
            return 'q'
        case 5:
            return 'p'
        default:
            return ''
    }
}

export const formatGames = (games) => {
    return games.map(element => {

        return {
            ...element,
            series: element.lm.seri,
            hta: element.h.ta,
            htn: element.h.tn,
            hs: element.h.s,
            vta: element.v.ta,
            vtn: element.v.tn,
            vs: element.v.s,
        }
    })
}

export const formatClock = (clock, status) => {
    if (status.includes('Halftime') || status.includes('Tipoff') || status.includes('Final')) {
        // game started, clock stopped
        return status
    } else if (status === 'PPD') {
        //PPD mean postponed
        return 'Postponed'
    } else if (status.includes('Start') || status.includes('End')) {
        const statusArray = status.split(' ')
        if (status.includes('Qtr')) {
            return statusArray[0] + ' of Q' + statusArray[2].charAt(0)
        } else {
            return statusArray[0] + ' of OT' + statusArray[2].charAt(0)
        }
    } else if (status && status.includes('Qtr')) {
        // game started being played over regular time
        return 'Q' + status.charAt(0) + ' ' + clock
    } else if (status && status.includes('OT')) {
        // game start being played over over time
        return 'OT' + status.charAt(0) + ' ' + clock
    }
    return clock
}

/**
 * Format Box score table's player minutes.
 * @param {row object} player
 */
export const formatMinutes = ({ minutes, seconds }) => {
    return `${minutes}:${seconds}`
}


/**
 * convert numerical decimal to percentage
 * @param {*} decimal
 *
 * @returns {string} 2 decimal percentage
 */
export const toPercentage = (decimal) => {
    if (Number.isNaN(decimal)) return '-'
    else return (decimal * 100).toFixed()
}

/**
 * determine who is winning
 */
export const isWinning = (self, other) => {
    if (self === '' && other === '') {
        return true
    } else {
        return +self > +other
    }
}
