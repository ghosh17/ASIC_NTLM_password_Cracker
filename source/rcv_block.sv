

module rcv_block
  (
    input logic clk,
    input logic n_rst,
    input logic serial_in,
    output logic [7:0] rx_data,
    output logic data_ready,
    output logic overrun_error,
    output logic framing_error
    );
    
    logic load_buffer, packet_done, shift_strobe, enable_timer, stop_bit, start_bit_detected,sbc_clear, sbc_enable;
    logic [7:0] packet_data;
    
    start_bit_det detect_start_bit (
      .clk(clk),
      .n_rst(n_rst),
      .serial_in(serial_in),
      .start_bit_detected(start_bit_detected)
      );
      
    stop_bit_chk detect_stop_bit (
      .clk(clk),
      .n_rst(n_rst),
      .sbc_clear(sbc_clear),
      .sbc_enable(sbc_enable),
      .stop_bit(stop_bit),
      .framing_error(framing_error)
      );

    rx_data_buff data_buff (
      .clk(clk),
      .n_rst(n_rst),
      .load_buffer(load_buffer),
      .packet_data(packet_data),
      .rx_data(rx_data),
      .data_ready(data_ready),
      .overrun_error(overrun_error)
      );
   
    timer tim (
      .clk(clk),
      .n_rst(n_rst),
      .enable_timer(enable_timer),
      .shift_strobe(shift_strobe),
      .packet_done(packet_done)
    );  
  
    sr_9bit sft_reg (
      .clk(clk),
      .n_rst(n_rst),
      .shift_strobe(shift_strobe),
      .serial_in(serial_in),
      .packet_data(packet_data),
      .stop_bit(stop_bit)
    );
  
    rcu bigblock (
      .clk(clk),
      .n_rst(n_rst),
      .start_bit_detected(start_bit_detected),
      .packet_done(packet_done),
      .framing_error(framing_error),
      .sbc_clear(sbc_clear),
      .sbc_enable(sbc_enable),
      .load_buffer(load_buffer),
      .enable_timer(enable_timer)
    );
  
endmodule
