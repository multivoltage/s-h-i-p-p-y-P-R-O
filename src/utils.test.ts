import { I_Flight } from './types';
import { splitSolutions, getSolutionPath } from './utils'

const baseFlight: I_Flight = {
    airlineId: 100,
    departureAirportId: 1,
    arrivalAirportId: 2,
    id: 0,
    price: 0
}

// describe('splitSolutions() from airport 1 to 2', () => {
//     test('single path: 1 - 2', () => {
//         let input = [baseFlight]
//         expect(splitSolutions(input)).toStrictEqual([input]);
//     });
//     test('single path: 1 - 3 - 2', () => {
//         const a: I_Flight = { ...baseFlight, arrivalAirportId: 3 }
//         const b: I_Flight = { ...baseFlight, departureAirportId: 3, arrivalAirportId: 2 }
//         let input = [a, b]

//         const output = [input]
//         expect(splitSolutions(input)).toStrictEqual(output);
//     });
//     test('single path: 1 - 3 - 4 - 2', () => {
//         const a: I_Flight = { ...baseFlight, arrivalAirportId: 3 }
//         const b: I_Flight = { ...baseFlight, departureAirportId: 3, arrivalAirportId: 4 }
//         const c: I_Flight = { ...baseFlight, departureAirportId: 4, arrivalAirportId: 2 }

//         let input = [a, b, c]

//         const output = [input]
//         expect(splitSolutions(input)).toStrictEqual(output);
//     });
//     test('2 paths: 1 - 2 and 1 - 4 - 2', () => {
//         const a: I_Flight = { ...baseFlight, arrivalAirportId: 2 }
//         const b: I_Flight = { ...baseFlight, arrivalAirportId: 4 }
//         const c: I_Flight = { ...baseFlight, departureAirportId: 4, arrivalAirportId: 2 }

//         let input = [a, b, c]

//         const output = [[a], [b, c]]
//         expect(splitSolutions(input)).toStrictEqual(output);
//     });
// });

describe('getSolutionPath from airport 1 to 2', () => {
    test('single path: 1 - 2', () => {
        let input = [baseFlight]
        expect(getSolutionPath(input)).toEqual([1, 2]);
    });
    test('single path: 1 - 3 - 2', () => {
        const a: I_Flight = { ...baseFlight, arrivalAirportId: 3 }
        const b: I_Flight = { ...baseFlight, departureAirportId: 3, arrivalAirportId: 2 }

        let input = [a, b]
        expect(getSolutionPath(input)).toEqual([1, 3, 2]);
    });
    test('single path: 1 - 3 - 4 - 2', () => {
        const a: I_Flight = { ...baseFlight, arrivalAirportId: 3 }
        const b: I_Flight = { ...baseFlight, departureAirportId: 3, arrivalAirportId: 4 }
        const c: I_Flight = { ...baseFlight, departureAirportId: 4, arrivalAirportId: 2 }

        let input = [a, b, c]
        expect(getSolutionPath(input)).toEqual([1, 3, 4, 2]);
    });
});

export { }



