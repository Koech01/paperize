package com.paperize.paperize_server.utils;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class ApplicationContextProvider implements ApplicationContextAware {

    private static ApplicationContext context;

    public static <T> T bean(Class<T> beanType) {
        return context.getBean(beanType);
    }

    public static Object bean(String bean) {
        return context.getBean(bean);
    }

    @Override
    public void setApplicationContext(@SuppressWarnings("NullableProblems") ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;
    }
}
