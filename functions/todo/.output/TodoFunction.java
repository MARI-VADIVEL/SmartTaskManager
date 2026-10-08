import com.catalyst.Context;
import com.catalyst.basic.BasicIO;
import com.catalyst.basic.ZCFunction;
import com.zc.common.ZCProject;
import com.zc.component.object.ZCObject;
import com.zc.component.object.ZCRowObject;
import com.zc.component.object.ZCRowPagedResponse;
import com.zc.component.object.ZCTable;
import java.util.ArrayList;
import java.util.List;

public class TodoFunction implements ZCFunction {

    private static final long TABLE_ID=73056000000028025L;

    @Override
    public void runner(Context context,BasicIO basicIO) throws Exception {
        try {
            ZCProject.initProject();

            ZCTable table=ZCObject.getInstance().getTable(TABLE_ID);

            String action=getParameter(basicIO,"action");

            if(action==null) {
                action="list";
            }

            if(action.equals("list")) {
                listTasks(table,basicIO);
            } else if(action.equals("add")) {
                addTask(table,basicIO);
            } else if(action.equals("update")) {
                updateTask(table,basicIO);
            } else if(action.equals("delete")) {
                deleteTask(table,basicIO);
            } else {
                error(basicIO,400,"Invalid action");
            }

        } catch(Exception e) {
            e.printStackTrace();
            error(basicIO,500,e.getMessage());
        }
    }

    private void listTasks(ZCTable table,BasicIO basicIO) throws Exception {
        ZCRowPagedResponse response=table.getPagedRows(null,100);

        StringBuilder result=new StringBuilder();

        result.append("{\"success\":true,\"data\":[");

        boolean first=true;

        for(ZCRowObject row:response.getRows()) {
            if(!first) {
                result.append(",");
            }

            result.append(row.getRowObject().toJSONString());
            first=false;
        }

        result.append("]}");

        basicIO.setStatus(200);
        basicIO.write(result.toString());
    }

    private void addTask(ZCTable table,BasicIO basicIO) throws Exception {
        String title=getParameter(basicIO,"title");

        if(title==null||title.trim().isEmpty()) {
            error(basicIO,400,"Title is required");
            return;
        }

        ZCRowObject row=ZCRowObject.getInstance();

        row.set("title",title.trim());
        row.set("description",getParameter(basicIO,"description"));
        row.set("status",getDefault(basicIO,"status","Active"));
        row.set("taskStatus",getDefault(basicIO,"taskStatus","MEDIUM"));
        row.set("category",getDefault(basicIO,"category","GENERAL"));
        row.set("userId",getDefault(basicIO,"userId","local-user"));
        row.set("taskOrder",getDefault(basicIO,"taskOrder","1"));

        String dueDate=getParameter(basicIO,"dueDate");

        if(dueDate!=null&&!dueDate.trim().isEmpty()) {
            row.set("dueDate",dueDate);
        }

        ZCRowObject created=table.insertRow(row);

        basicIO.setStatus(201);

        basicIO.write(
            "{\"success\":true,\"data\":"+
            created.getRowObject().toJSONString()+
            "}"
        );
    }

    private void updateTask(ZCTable table,BasicIO basicIO) throws Exception {
        String rowId=getParameter(basicIO,"rowId");

        if(rowId==null||rowId.trim().isEmpty()) {
            error(basicIO,400,"rowId is required");
            return;
        }

        ZCRowObject row=ZCRowObject.getInstance();

        row.set("ROWID",Long.valueOf(rowId));

        setValue(row,basicIO,"title");
        setValue(row,basicIO,"description");
        setValue(row,basicIO,"status");
        setValue(row,basicIO,"taskStatus");
        setValue(row,basicIO,"category");
        setValue(row,basicIO,"dueDate");
        setValue(row,basicIO,"userId");
        setValue(row,basicIO,"taskOrder");

        List<ZCRowObject> rows=new ArrayList<>();
        rows.add(row);

        table.updateRows(rows);

        ZCRowObject updated=table.getRow(Long.valueOf(rowId));

        basicIO.setStatus(200);

        basicIO.write(
            "{\"success\":true,\"data\":"+
            updated.getRowObject().toJSONString()+
            "}"
        );
    }

    private void deleteTask(ZCTable table,BasicIO basicIO) throws Exception {
        String rowId=getParameter(basicIO,"rowId");

        if(rowId==null||rowId.trim().isEmpty()) {
            error(basicIO,400,"rowId is required");
            return;
        }

        table.deleteRow(Long.valueOf(rowId));

        basicIO.setStatus(200);

        basicIO.write(
            "{\"success\":true,\"message\":\"Task deleted\"}"
        );
    }

    private void setValue(
        ZCRowObject row,
        BasicIO basicIO,
        String name
    ) {
        String value=getParameter(basicIO,name);

        if(value!=null) {
            row.set(name,value);
        }
    }

    private String getParameter(
        BasicIO basicIO,
        String name
    ) {
        Object value=basicIO.getParameter(name);

        if(value==null) {
            return null;
        }

        return value.toString();
    }

    private String getDefault(
        BasicIO basicIO,
        String name,
        String defaultValue
    ) {
        String value=getParameter(basicIO,name);

        if(value==null||value.trim().isEmpty()) {
            return defaultValue;
        }

        return value;
    }

    private void error(
        BasicIO basicIO,
        int status,
        String message
    ) throws Exception {
        basicIO.setStatus(status);

        if(message==null) {
            message="Unknown error";
        }

        message=message.replace("\"","\\\"");

        basicIO.write(
            "{\"success\":false,\"error\":\""+
            message+
            "\"}"
        );
    }
}