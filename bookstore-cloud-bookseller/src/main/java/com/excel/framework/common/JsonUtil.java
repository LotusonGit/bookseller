package com.excel.framework.common;

import org.json.JSONObject;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class JsonUtil {
    /**
     * data={"id":"1"}用json的数据创建指定的pojo.
     *
     * @param <T>         Object
     * @param data        json字符串
     * @param clazz       需要转换成bean的具体类型
     * @param excludes    不需要转换的属性数组
     * @param datePattern 日期转换模式
     * @return T
     * @throws Exception java.lang.InstantiationException, java.beans.IntrospectionException, java.lang.IllegalAccessException
     */
    public static <T extends Object> T json2Bean(String data, Class<T> clazz, String[] excludes, String datePattern)
            throws Exception {
        // JsonUtils.configJson(excludes, datePattern);
        T entity = clazz.newInstance();

        return json2Bean(data, entity, excludes, datePattern);
    }

    /**
     * json转换成bean.
     *
     * @param data  json字符串
     * @param clazz 需要转换的类型
     * @param <T>   泛型
     * @return clazz实例
     * @throws Exception 可能抛出任何异常
     */
    public static <T extends Object> T json2Bean(String data, Class<T> clazz) throws Exception {
        return json2Bean(data, clazz, null, null);
    }

    /**
     * data={"id":"1"}用json里的数据，填充指定的pojo.
     *
     * @param <T>         Object
     * @param data        json字符串
     * @param entity      需要填充数据的bean
     * @param excludes    不需要转换的属性数组
     * @param datePattern 日期转换模式
     * @return T
     * @throws Exception java.lang.InstantiationException, java.beans.IntrospectionException, java.lang.IllegalAccessException
     */
    public static <T extends Object> T json2Bean(String data, T entity, String[] excludes, String datePattern)
            throws Exception {
        // JsonUtils.configJson(excludes, datePattern);
        JSONObject jsonObject = new JSONObject(data);

        return json2Bean(jsonObject, entity, excludes, datePattern);
    }

    /**
     * json转换成bean.
     *
     * @param data   json字符串
     * @param entity 实例
     * @param <T>    泛型
     * @return 实例
     * @throws Exception 可能抛出任何异常
     */
    public static <T extends Object> T json2Bean(String data, T entity) throws Exception {
        return json2Bean(data, entity, null, null);
    }

    /**
     * 根据Class生成entity，再把JSONObject中的数据填充进去.
     *
     * @param <T>         Object
     * @param jsonObject  json对象
     * @param clazz       需要转换成bean的具体类型
     * @param excludes    不需要转换的属性数组
     * @param datePattern 日期转换模式
     * @return T
     * @throws Exception java.lang.InstantiationException, java.beans.IntrospectionException, java.lang.IllegalAccessException
     */
    public static <T extends Object> T json2Bean(JSONObject jsonObject, Class<T> clazz, String[] excludes,
                                                 String datePattern) throws Exception {
        // JsonUtils.configJson(excludes, datePattern);
        T entity = clazz.newInstance();

        return json2Bean(jsonObject, entity, excludes, datePattern);
    }

    /**
     * json转换成bean.
     *
     * @param jsonObject JSONObject
     * @param clazz      类型
     * @param <T>        泛型
     * @return 实例
     * @throws Exception 可能抛出任何异常
     */
    public static <T extends Object> T json2Bean(JSONObject jsonObject, Class<T> clazz) throws Exception {
        return json2Bean(jsonObject, clazz, null, null);
    }

    /**
     * 把JSONObject中的数据填充到entity中.
     *
     * @param <T>         Object
     * @param jsonObject  json对象
     * @param entity      需要填充数据的node
     * @param excludes    不需要转换的属性数组
     * @param datePattern 日期转换模式
     * @return T
     * @throws Exception java.lang.InstantiationException, java.beans.IntrospectionException, java.lang.IllegalAccessException
     */
    @SuppressWarnings("rawtypes")
    public static <T extends Object> T json2Bean(JSONObject jsonObject, T entity, String[] excludes, String datePattern)
            throws Exception {
        // JsonUtils.configJson(excludes, datePattern);
        Set<String> excludeSet = createExcludeSet(excludes);

        try {
            Object object = null;
            for (Iterator it = jsonObject.keys(); it.hasNext(); ) {
                object = it.next();
                String propertyName = object.toString();

                if (excludeSet.contains(propertyName)) {
                    continue;
                }

                String propertyValue = jsonObject.getString(propertyName);

                try {
                    PropertyDescriptor propertyDescriptor = new PropertyDescriptor(propertyName, entity.getClass());
                    Class propertyType = propertyDescriptor.getPropertyType();
                    Method writeMethod = propertyDescriptor.getWriteMethod();
                    invokeWriteMethod(entity, writeMethod, propertyType, propertyValue, datePattern);
                } catch (IntrospectionException ex) {
                    ex.printStackTrace();
                    continue;
                }
            }
        } catch (Exception e) {
            throw e;
        }


        return entity;
    }

    /**
     * 配置排除列表.
     *
     * @param excludes String[]
     * @return exclude set
     */
    public static Set<String> createExcludeSet(String[] excludes) {
        Set<String> excludeSet = new HashSet<String>();
        if (excludes != null) {
            for (String exclude : excludes) {
                excludeSet.add(exclude);
            }
        } else {
            excludeSet.add("hibernateLazyInitializer");
        }

        return excludeSet;
    }

    /**
     * 根据类型，反射调用setter方法.
     *
     * @param entity        实例
     * @param writeMethod   setter方法
     * @param propertyType  数据类型
     * @param propertyValue 数据值
     * @param datePattern   日期格式
     * @throws IntrospectionException methed
     * @throws Exception              e
     */
    @SuppressWarnings("rawtypes")
    public static void invokeWriteMethod(Object entity, Method writeMethod, Class propertyType, String propertyValue,
                                         String datePattern) throws IntrospectionException, Exception {
        try {
            /** 如果参数为空 则 不再做处理 **/
            if (!UtyCommon.notNullorEmpty(propertyValue)) {
                return;
            }
            /** 验证八个基本类型 **/
            if (isPrimivite(propertyType)) {
                invokePrimivite(entity, writeMethod, propertyType, propertyValue);
                /** 验证String类型 **/
            } else if (propertyType == String.class) {
                writeMethod.invoke(entity, propertyValue);
                /** 验证date类型 **/
            } else if (propertyType == Date.class && UtyCommon.notNullorEmpty(propertyValue) && !"null".equals(propertyValue)) {
                SimpleDateFormat dateFormat = getDateFormat(datePattern);
                /** 如果datePattern为空，SimpleDateFormat 的默认格式为 yyyy-MM-dd T HH:mm:ss **/
                try {
                    /** 如果 采用默认格式 则 容易转换失败 如：（2011-11-11） **/
                    writeMethod.invoke(entity, dateFormat.parse(propertyValue));
                } catch (ParseException e) {
                    /** 如果 转换格式失败 则 采用年月日格式 **/
                    writeMethod.invoke(entity, getDateFormat(UtyDate.DATE_FORMAT).parse(propertyValue));
                }
            }
        } catch (IntrospectionException e) {
            /** 转为bean的json信息 里包含了大量其他参数信息 没有找到weiterMethod将很常见 此处起提示作用 **/
            throw new IntrospectionException("没有找到" + writeMethod + "方法！");
        } catch (Exception exception) {
            /** 如果包含其他异常将记录并向上抛出 **/
            // logger.error(exception);
            throw new Exception(exception);
        }

    }

    /**
     * 处理基本类型.
     *
     * @param entity        实例
     * @param writeMethod   setter方法
     * @param propertyType  数据类型
     * @param propertyValue 数据值
     * @throws Exception 异常
     */
    @SuppressWarnings("rawtypes")
    public static void invokePrimivite(Object entity, Method writeMethod, Class propertyType, String propertyValue)
            throws Exception {
        if (isByte(propertyType)) {
            writeMethod.invoke(entity, Byte.parseByte(propertyValue));
        } else if (isShort(propertyType)) {
            writeMethod.invoke(entity, Short.parseShort(propertyValue));
        } else if (isInt(propertyType)) {
            writeMethod.invoke(entity, Integer.parseInt(propertyValue));
        } else if (isLong(propertyType)) {
            writeMethod.invoke(entity, Long.parseLong(propertyValue));
        } else if (isFloat(propertyType)) {
            writeMethod.invoke(entity, Float.parseFloat(propertyValue));
        } else if (isDouble(propertyType)) {
            writeMethod.invoke(entity, Double.parseDouble(propertyValue));
        } else if (isBoolean(propertyType)) {
            writeMethod.invoke(entity, Boolean.parseBoolean(propertyValue));
        } else if (isChar(propertyType)) {
            writeMethod.invoke(entity, propertyValue.charAt(0));
        }
    }

    /**
     * 是否为八个基本类型.
     *
     * @param clazz 类型
     * @return boolean
     */
    @SuppressWarnings("rawtypes")
    public static boolean isPrimivite(Class clazz) {
        if (isByte(clazz)) {
            return true;
        } else if (isShort(clazz)) {
            return true;
        } else if (isInt(clazz)) {
            return true;
        } else if (isLong(clazz)) {
            return true;
        } else if (isFloat(clazz)) {
            return true;
        } else if (isDouble(clazz)) {
            return true;
        } else if (isBoolean(clazz)) {
            return true;
        } else if (isChar(clazz)) {
            return true;
        }

        return false;
    }

    /**
     * <br>
     * <b>作者： lzy</b> <br>
     * 创建时间：2012-3-30 上午10:44:42
     *
     * @param clazz 传递过来的类型
     * @return bollean
     * @since 1.0
     */
    public static boolean isBigDecimal(@SuppressWarnings("rawtypes") Class clazz) {
        return clazz == BigDecimal.class;
    }

    /**
     * 是否为byte类型.
     *
     * @param clazz 类型
     * @return boolean
     */
    @SuppressWarnings("rawtypes")
    public static boolean isByte(Class clazz) {
        return (clazz == Byte.class) || (clazz == byte.class);
    }

    public static boolean isShort(Class<?> clazz) {
        return (clazz == Short.class) || (clazz == short.class);
    }

    public static boolean isInt(Class<?> clazz) {
        return (clazz == Integer.class) || (clazz == int.class);
    }

    public static boolean isLong(Class<?> clazz) {
        return (clazz == Long.class) || (clazz == long.class);
    }

    public static boolean isFloat(Class<?> clazz) {
        return (clazz == Float.class) || (clazz == float.class);
    }

    public static boolean isDouble(Class<?> clazz) {
        return (clazz == Double.class) || (clazz == double.class);
    }

    public static boolean isBoolean(Class<?> clazz) {
        return (clazz == Boolean.class) || (clazz == boolean.class);
    }

    public static boolean isChar(Class<?> clazz) {
        return (clazz == Character.class) || (clazz == char.class);
    }

    public static SimpleDateFormat getDateFormat(String datePattern) {
        return new SimpleDateFormat(datePattern);
    }
}

