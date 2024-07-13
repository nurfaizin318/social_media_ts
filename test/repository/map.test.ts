

import axios from 'axios';

import { MapRepository } from '../../src/repository/map-repository';
import { ResponsePolyline, ResponsePlace } from '../../src/model/map-model';
import { RideTypeRequest } from '../../src/model/ride-model';

// Mock the axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MapRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPolyline', () => {
    it('should return polyline data', async () => {
      const params: RideTypeRequest = { location: '13.388860,52.517037', destination: '13.397634,52.529407',distance: "4" };
      const mockResponse = {
        data: { routes: [{ geometry: 'polyline-data' }] } as ResponsePolyline,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        request: {}
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await MapRepository.getPolyline(params);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://router.project-osrm.org/route/v1/driving/${params.location};${params.destination}?overview=full&geometries=polyline`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const params: RideTypeRequest = { location: '13.388860,52.517037', destination: '13.397634,52.529407' ,distance:"4"};
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await expect(MapRepository.getPolyline(params)).rejects.toThrow(errorMessage);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://router.project-osrm.org/route/v1/driving/${params.location};${params.destination}?overview=full&geometries=polyline`
      );
    });
  });

  describe('getListplace', () => {
    it('should return list of places', async () => {
      const params = 'Berlin';
      const mockResponse = {
        data: [{ place_id: 1, display_name: 'Berlin, Germany' }] as ResponsePlace[],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        request: {}
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await MapRepository.getListplace(params);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${params}&format=jsonv2&limit=8`
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const params = 'Berlin';
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await expect(MapRepository.getListplace(params)).rejects.toThrow(errorMessage);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${params}&format=jsonv2&limit=8`
      );
    });
  });
});
