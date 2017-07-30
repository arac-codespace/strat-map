namespace :timescale do
  desc "Import assets/json/timescale.json"
  task import: :environment do
    
    json_list = JSON.parse(File.read('app/assets/json/timescale.json'))
    
    # list = json_list["results"]
    
      json_list["records"].each_with_index do |x,i|
        timescale_record = Timescale.new
        timescale_record.interval_no = x["oid"]
        timescale_record.scale_no = x["tsc"]
        timescale_record.level = x["lvl"]
        timescale_record.interval_name = x["nam"]
        timescale_record.abbrev = x["abr"]
        timescale_record.parent_no = x["pid"]
        timescale_record.color = x["col"]
        timescale_record.late_age = x["lag"]
        timescale_record.early_age = x["eag"]
        timescale_record.reference_no = x["rid"]
      
      timescale_record.save
    end
    
    
    
  end

end
