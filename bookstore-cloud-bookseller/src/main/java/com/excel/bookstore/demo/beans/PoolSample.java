package com.excel.bookstore.demo.beans;

public class PoolSample {

    private String poolName;
    private int capacity;
    private int minSize;
    private int maxSize;

    public PoolSample() {
    }

    public PoolSample(String poolName, int capacity, int minSize, int maxSize) {
        this.poolName = poolName;
        this.capacity = capacity;
        this.minSize = minSize;
        this.maxSize = maxSize;
    }

    public String getPoolName() {
        return poolName;
    }

    public void setPoolName(String poolName) {
        this.poolName = poolName;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getMinSize() {
        return minSize;
    }

    public void setMinSize(int minSize) {
        this.minSize = minSize;
    }

    public int getMaxSize() {
        return maxSize;
    }

    public void setMaxSize(int maxSize) {
        this.maxSize = maxSize;
    }

    @Override
    public String toString() {
        return "PoolSample{" +
                "poolName='" + poolName + '\'' +
                ", capacity=" + capacity +
                ", minSize=" + minSize +
                ", maxSize=" + maxSize +
                '}';
    }
}
