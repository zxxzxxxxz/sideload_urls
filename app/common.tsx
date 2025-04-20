export const tableStyle = { margin: '4px', width: 'calc(100% - (4px + 4px))' };
export const cellStyle = { border: '1px solid', padding: '4px', width: 'calc(100% / 4)' };
export const theadElement = <thead>
    <tr>
        <th style={cellStyle}>
            <p>Version</p>
        </th>
        <th style={cellStyle}>
            <p>Date</p>
        </th>
        <th style={cellStyle}>
            <p>Direct</p>
        </th>
        <th style={cellStyle}>
            <p>LiveContainer</p>
        </th>
    </tr>
</thead>;