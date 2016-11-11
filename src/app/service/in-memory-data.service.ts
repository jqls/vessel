import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class ServerData implements InMemoryDbService {
  createDb() {
    let heros = [
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'}
    ];

    //let t = JSON.stringify('"X":"SFJKAJFA"');
    let t = JSON.stringify({"test": ['a', 'b']});
    let tables_columns= JSON.stringify([
                              {'table_name':'table_1', 'col_list': ["col1"]},
                              {'table_name':'table_2', 'col_list': ["col1", "col2"]},
                              {'table_name':'table_3', 'col_list': ["col1", "col2", "col3"]},
                              {'table_name':'table_4', 'col_list': ["col1", "col2", "col3", "col4"]},
                              {'table_name':'table_5', 'col_list': ["col1", "col2", "col3", "col4", "col5"]}                     
    ]);

    // let rdb_login = [{'rdb_addr':'addr'}, {"name":''}, {'pswd':'pswd'}];
    var rdb_login = {"rdb_addr":"", "name":"hhh", "pswd":""};
    var hdfs_add = {"hdfs_addr":''};
    var hdfs_dir = JSON.stringify(//hfds目录结构
  [
	{
		"name": "dir_1",
		"content":[
			{
				"name": "dir_1_1"
			},
			{
				"name": "dir_1_2",
				"content": [
					{
						"name": "dir_1_2_1"
					},
					{
						"name": "dir_1_2_2"
					}
				]
			}
		]
	},
	{
		"name": "dir_2"
	},
	{
		"name": "dir_3",
		"content":[
			{
				"name": "dir_3_1"
			},
			{
				"name": "dir_3_2",
				"content":[
					{
						"name": "dir_3_2_1"
					}
				]
			}
		]
	}
]
    );

		let tasklist= JSON.stringify([
                              {'task_name': 'task_1', 'status': 'status_1'},
                              {'task_name': 'task_2', 'status': 'status_2'},
                              {'task_name': 'task_3', 'status': 'status_3'},
                              {'task_name': 'task_4', 'status': 'status_4'},
                              {'task_name': 'task_5', 'status': 'status_5'}                     
    ]);

    return {heros, tables_columns, t, rdb_login, hdfs_add, hdfs_dir, tasklist};
  }
}
