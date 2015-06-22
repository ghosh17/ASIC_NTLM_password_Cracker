// $Id: $
// File name:   rcu.sv
// Created:     2/19/2015
// Author:      Thomas Yurek
// Lab Section: 337-05
// Version:     1.0  Initial Design Entry
// Description: rcu
module rcu
(
  input wire clk,
  input wire n_rst,
  input wire start_bit_detected,
  input wire packet_done,
  input wire framing_error,
  output reg sbc_clear,
  output reg sbc_enable,
  output reg load_buffer,
  output reg enable_timer
);
  typedef enum bit [3:0] {IDLE, TIMER_ENABLE, PULSE_SBC_ENABLE, CHECK_FOR_ERROR, PULSE_LOAD_BUFFER} stateType;
  stateType state;
  stateType next_state;
  always_ff @ (posedge clk, negedge n_rst) begin
    if (n_rst == 0) begin
      state <= IDLE;
    end
    else begin
      state <= next_state;
    end
  end
  always_comb begin
    next_state = state;
    case(state)
      IDLE: begin
        if(start_bit_detected == 1)next_state = TIMER_ENABLE;
        else next_state = IDLE;
        sbc_clear = 0;
        sbc_enable = 0;
        load_buffer = 0;
        enable_timer = 0;
      end
      TIMER_ENABLE: begin
        if(packet_done == 1)next_state = PULSE_SBC_ENABLE;
        else next_state = TIMER_ENABLE;
        sbc_clear = 1;
        sbc_enable = 0;
        load_buffer = 0;
        enable_timer = 1;
      end
      PULSE_SBC_ENABLE: begin
        next_state = CHECK_FOR_ERROR;
        sbc_clear = 0;
        sbc_enable = 1;
        load_buffer = 0;
        enable_timer = 0;
      end
      CHECK_FOR_ERROR: begin
        //if(framing_error == 1)next_state = IDLE;
        //else 
        next_state = PULSE_LOAD_BUFFER;
        sbc_clear = 0;
        sbc_enable = 0;
        load_buffer = 0;
        enable_timer = 0;
      end
      PULSE_LOAD_BUFFER: begin
        next_state = IDLE;
        sbc_clear = 0;
        sbc_enable = 0;
        load_buffer = 1;
        enable_timer = 0;
      end
      default: begin
        if(start_bit_detected == 1)next_state = TIMER_ENABLE;
        else next_state = IDLE;
        sbc_clear = 0;
        sbc_enable = 0;
        load_buffer = 0;
        enable_timer = 0;
      end
    endcase
  end
endmodule