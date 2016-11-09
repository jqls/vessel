import {Component, OnInit} from "@angular/core";
import {DatabaseConnectionsService} from "../../services/database-connections.service";

@Component({
    selector: 'app-connection-select',
    templateUrl: './connection-select.component.html',
    styleUrls: ['./connection-select.component.sass'],
    providers: [
        DatabaseConnectionsService
    ]
})
export class ConnectionSelectComponent implements OnInit {

    private connections: [{}];
    selectedConnection: {};
    connected: boolean = false;

    constructor(private dbConnectionsService: DatabaseConnectionsService) {
        dbConnectionsService.promiseConnections().then(response => {
            this.connections = response.json();
            console.log("Load connections.");
        });
    }

    //connect 会尝试连接数据库使用指定
    connect() {
        if (this.selectedConnection == null || this.connected) {
            return;
        }
        this.connected = true;
    }

    //selectConnection 选中一个连接信息
    selectConnection(connection: {}) {
        if (this.selectedConnection == connection) {
            this.selectedConnection = null;
        } else {
            this.selectedConnection = connection;
        }
    }

    //disconnect 断开已经存在的连接
    disconnect() {
        if (this.connected) {
            this.connected = false;
        }
    }

    newConnection() {

    }

    ngOnInit() {
    }

}
