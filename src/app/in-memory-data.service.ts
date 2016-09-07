import {ResultJSON} from "./craft/result.component/internal/resultType";
export class InMemoryDataService {
    createDb() {
        let results:ResultJSON[] = [
            {id: '11', flowID: 1, result: 'Mr. Nice'},
            {id: '12', flowID: 2, result: 'Narco'},
            {id: '13', flowID: 3, result: 'Bombasto'},
            {id: '14', flowID: 4, result: 'Celeritas'},
            {id: '15', flowID: 5, result: 'Magneta'},
            {id: '16', flowID: 6, result: 'RubberMan'},
            {id: '17', flowID: 7, result: 'Dynama'},
            {id: '18', flowID: 8, result: 'Dr IQ'},
            {id: '19', flowID: 9, result: 'Magma'},
            {id: '10', flowID: 0, result: 'Tornado'}
        ];
        return {results};
    }
}