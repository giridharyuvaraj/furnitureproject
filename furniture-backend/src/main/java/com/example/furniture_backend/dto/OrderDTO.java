package com.example.furniture_backend.dto;

import java.util.List;

public class OrderDTO {

    private Long orderId;
    private double totalAmount;
    private String paymentStatus;

    // ISO-8601 order creation date/time
    private String orderDate;

    // List of products in the order
    private List<OrderItemDTO> items;

    //No-args constructor
    public OrderDTO() {
    }

    // All-args constructor
    public OrderDTO(Long orderId, double totalAmount,
                    String paymentStatus, List<OrderItemDTO> items) {
        this.orderId = orderId;
        this.totalAmount = totalAmount;
        this.paymentStatus = paymentStatus;
        this.items = items;
    }

    public OrderDTO(Long orderId, double totalAmount,
                    String paymentStatus, List<OrderItemDTO> items,
                    String orderDate) {
        this.orderId = orderId;
        this.totalAmount = totalAmount;
        this.paymentStatus = paymentStatus;
        this.items = items;
        this.orderDate = orderDate;
    }

    // Getters & Setters

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }
}
