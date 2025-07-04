import './TableReport.scss';
import block from 'bem-cn-lite';
import React, {useEffect, useState} from 'react';
import {ApiRentResponse} from '@services/supping-api';
import {api} from '@services/api';

import {Table, useTable} from '@gravity-ui/table';
import type {ColumnDef} from '@gravity-ui/table/tanstack';
import {Button} from '@gravity-ui/uikit';
import * as XLSX from 'xlsx';


const b = block('table-users');

interface modeApiRentResponse extends Omit<ApiRentResponse, 'rentTime'> {
    rentTime: string
}

export function TableReport() {
    const [report, setReport] = useState<modeApiRentResponse[]>([]);


    useEffect(() => {
        api.v1.findAllByFilter2(
            {
                sort: {
                    field: "createdAt",
                    direction: 'DESC'
                },
                // Возвращать список за сегодняшний день
                //TODO вынесли в UI
                // actualOnly: false,
                page: 0,
                size: 1000
            })
            .then((response) => {

                if (response.data.rents && response.data.rents.content) {

                    const parserResponse = response.data.rents.content.map((item) => ({

                        createdAt: new Date(parseFloat(item.createdAt!) * 1000).toDateString(),
                        rentCost: item.rentCost,
                        totalRentCost: item.totalRentCost,
                        item: {
                            description: item?.item?.description,
                            name: item?.item?.name
                        },

                        rentTime: (item.rentTime === 0 || !item.rentTime) ? '0' :
                            `${Math.ceil(item.rentTime / 60)}`
                    })
                    )

                    setReport(parserResponse)
                }
            })
            .catch((error) => {

                console.log('Не удалось получить данные');
            });
    }, [])

    const columns: ColumnDef<modeApiRentResponse>[] = [
        {accessorKey: 'createdAt', header: 'Дата', size: 100},
        {accessorKey: 'item.name', header: 'Инв.номер', size: 100},
        {accessorKey: 'item.description', header: 'Наименование', size: 100},
        {accessorKey: 'rentTime', header: 'Время аренды (мин)', size: 100},
        {accessorKey: 'rentCost', header: 'Итого (руб)', size: 100},
        {accessorKey: 'totalRentCost', header: 'Сумма', size: 100},
    ];

    const table = useTable<modeApiRentResponse>({
        columns,
        data: report,
    });

    function exportFile() {

        const worksheet = XLSX.utils.json_to_sheet(
            report.map(item => ({
                'Дата': item.createdAt,
                'Инвент. номер': item.item?.name,
                'Наименование': item.item?.description,
                'Время аренды (мин)': item.rentTime,
                'Сумма': item.rentCost,
                'Итого (руб)': item.totalRentCost,

            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Лист1");

        XLSX.writeFile(workbook, "Отчет об аренде оборудования.xlsx");

    }

    return (
        <div className={b()}>
            <Button onClick={exportFile}>Экспортировать в excel</Button>
            <Table table={table} />
        </div>
    )
}