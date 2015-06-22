library verilog;
use verilog.vl_types.all;
entity controller is
    port(
        clk             : in     vl_logic;
        n_rst           : in     vl_logic;
        start_bit       : out    vl_logic;
        rx_in           : in     vl_logic_vector(0 to 7);
        data_ready      : in     vl_logic;
        match           : in     vl_logic_vector(0 to 6);
        out_byte        : out    vl_logic_vector(0 to 7);
        shift_byte      : out    vl_logic_vector(0 to 7);
        shift_out       : out    vl_logic;
        read_enable     : out    vl_logic;
        write_enable    : out    vl_logic;
        address         : out    vl_logic_vector(0 to 9);
        read_data       : in     vl_logic_vector(0 to 127);
        write_data      : out    vl_logic_vector(0 to 127);
        outstr          : in     vl_logic_vector(127 downto 0);
        data_ready_posedge: in     vl_logic;
        tx_done         : in     vl_logic
    );
end controller;
