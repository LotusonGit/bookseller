package com.excel.bookstore.web.interceptor;

import org.json.JSONObject;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * 异常处理器。该类会处理所有在执行标有@RequestMapping注解的方法时发生的异常
 * Created by whf on 4/7/16.
 */
//@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {


    /**
     * 处理500错误
     *
     * @return
     */
    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
        //log.error("got internal error : {}", ex);

      /*  // 请求方式不支持
        if (ex instanceof HttpRequestMethodNotSupportedException) {
            return new ResponseEntity<Object>(new MatrixResponse(ErrorCode.REQUEST_METHOD_UNSUPPORTED), status);
        }*/
        JSONObject jsobj = new JSONObject();
        jsobj.put("errorCode", "EXL500");
        jsobj.put("errorMsg", ex.getMessage());
        return new ResponseEntity<Object>(jsobj, status);
    }


    /**
     * 处理参数类型转换失败
     *
     * @param request
     * @return
     */
    @Override
    protected ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        //log.error("type mismatch");

        return new ResponseEntity<Object>(null, status);
    }
}